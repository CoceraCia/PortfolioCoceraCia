export function initPortfolioInteractions() {
  const stage = document.getElementById("stage");
  const scene = document.querySelector(".scene");
  const screen = document.querySelector(".screen");
  const phoneButtons = document.querySelectorAll(".phone-button");
  const actionButton = document.querySelector(".action-button");
  const volumeUpButton = document.querySelector(".volume-up");
  const volumeDownButton = document.querySelector(".volume-down");
  const powerButton = document.querySelector(".power-button");
  const volumeHud = document.getElementById("volumeHud");
  const volumeFill = document.getElementById("volumeFill");
  const volumeGlyph = document.getElementById("volumeGlyph");
  const statusLeft = document.querySelector(".status-left");
  const islandFeedbackPill = document.getElementById("islandFeedbackPill");
  const islandFeedbackIcon = document.getElementById("islandFeedbackIcon");
  const islandFeedbackLabel = document.getElementById("islandFeedbackLabel");
  const islandFeedbackCenter = document.getElementById("islandFeedbackCenter");
  const islandFeedbackRight = document.querySelector(".island-feedback-right");
  const lockDate = document.getElementById("lockDate");
  const lockTime = document.getElementById("lockTime");
  const dockApps = document.querySelectorAll(".dock-app");
  const topNotification = document.querySelector(".liquid-glass-notification");
  const projectsTerminalCode = document.getElementById("projectsTerminalCode");

  if (!stage || !scene || !screen || !actionButton || !volumeUpButton || !volumeDownButton || !powerButton || !volumeHud || !volumeFill || !volumeGlyph || !statusLeft || !islandFeedbackPill || !islandFeedbackIcon || !islandFeedbackLabel || !islandFeedbackCenter || !islandFeedbackRight || !lockDate || !lockTime || !topNotification || !projectsTerminalCode) {
    return () => {};
  }

  let audioCtx;
  let lastToneAt = 0;
  let volumeLevel = 0.58;
  let isMuted = false;
  let isPoweredOff = false;
  let activeStep = "step-0";
  let hudTimer;
  let islandFeedbackTimer;
  let islandFeedbackRaf = 0;
  let islandFeedbackStateTimer;
  let islandFeedbackCloseTimer;
  let islandFeedbackVisibilityTimer;
  let statusFadeRaf = 0;
  let statusFadeLoopRaf = 0;
  let lockClockTimer;
  let notificationTimer;
  let notificationLongPressTimer;
  let notificationPointerId = null;
  let notificationStartY = 0;
  let notificationDragY = 0;
  let notificationIsDragging = false;
  let notificationDismissed = false;
  let terminalTimer = 0;
  let terminalIsPlaying = false;
  let terminalShouldLoop = false;
  let terminalIsWaitingToReplay = false;
  let lastVolumePressAt = 0;
  let lastVolumeButton = "";
  let compactHudUntil = 0;

  const DOUBLE_PRESS_WINDOW_MS = 360;
  const NOTIFICATION_LONG_PRESS_MS = 240;
  const NOTIFICATION_DISMISS_Y = -56;
  const SILENT_ICON_PILL_WIDTH = 56;
  const RING_ICON_PILL_WIDTH = 22;

  const TERMINAL_SCRIPT = [
    { text: "$ kizamu search \"one piece\"\n", speed: 58, variance: 20 },
    { pause: 620 },
    { text: "\nFound 12 results\n", speed: 30, variance: 8 },
    { text: "> Selecting source...\n", speed: 34, variance: 10 },
    { pause: 520 },
    { text: "\n$ kizamu download \"chapter-1100\" --format cbz\n", speed: 56, variance: 20 },
    { pause: 640 },
    { text: "\nDownloading pages...\n", speed: 30, variance: 8 },
    { text: "[", speed: 18, variance: 4 },
    { text: "██████████████████", speed: 13, variance: 3 },
    { text: "] 100%\n", speed: 22, variance: 5 },
    { pause: 420 },
    { text: "\nProcessing images...\n", speed: 31, variance: 8 },
    { text: "Creating CBZ archive...\n", speed: 33, variance: 9 },
    { pause: 560 },
    { text: "\nDone: One_Piece_1100.cbz", speed: 34, variance: 10 },
  ];

  const getTypingDelay = (base, variance = 0) => {
    const jitter = variance > 0 ? (Math.random() * variance * 2 - variance) : 0;
    return Math.max(10, Math.round(base + jitter));
  };

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const timeFormatter = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const updateLockClock = () => {
    const now = new Date();
    lockDate.textContent = dateFormatter.format(now);
    lockTime.textContent = timeFormatter.format(now);
  };

  const startLockClock = () => {
    updateLockClock();
    if (lockClockTimer) window.clearInterval(lockClockTimer);
    lockClockTimer = window.setInterval(updateLockClock, 1000);
  };

  const ensureAudioContext = async () => {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === "suspended") {
      try {
        await audioCtx.resume();
      } catch (_) {
        return null;
      }
    }
    return audioCtx;
  };

  const playTone = async (type) => {
    const now = performance.now();
    if (now - lastToneAt < 28) return;
    lastToneAt = now;

    const ctx = await ensureAudioContext();
    if (!ctx) return;

    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const gain2 = ctx.createGain();
    const hp = ctx.createBiquadFilter();
    const lp = ctx.createBiquadFilter();

    let startFreq = 1320;
    let endFreq = 820;
    let peak = 0.06;
    let length = 0.07;

    if (type === "volume-up") {
      startFreq = 720;
      endFreq = 980;
      peak = 0.055;
      length = 0.085;
    } else if (type === "volume-down") {
      startFreq = 980;
      endFreq = 660;
      peak = 0.055;
      length = 0.085;
    } else if (type === "mute") {
      startFreq = 740;
      endFreq = 500;
      peak = 0.05;
      length = 0.09;
    } else if (type === "unmute") {
      startFreq = 500;
      endFreq = 760;
      peak = 0.05;
      length = 0.09;
    }

    osc.type = "sine";
    osc2.type = "triangle";
    osc.frequency.setValueAtTime(startFreq, t0);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + length * 0.56);
    osc2.frequency.setValueAtTime(startFreq * 2.02, t0);
    osc2.frequency.exponentialRampToValueAtTime(endFreq * 2.05, t0 + length * 0.5);

    hp.type = "highpass";
    hp.frequency.setValueAtTime(280, t0);
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2600, t0);

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + length);
    gain2.gain.setValueAtTime(0.0001, t0);
    gain2.gain.exponentialRampToValueAtTime(peak * 0.45, t0 + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.0001, t0 + length);

    osc.connect(hp);
    osc2.connect(lp);
    hp.connect(gain);
    lp.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.start(t0);
    osc2.start(t0);
    osc.stop(t0 + length + 0.01);
    osc2.stop(t0 + length + 0.01);
  };

  const pressButton = (button) => {
    button.classList.add("is-pressed");
    window.setTimeout(() => {
      button.classList.remove("is-pressed");
    }, 110);
  };

  const isInteractiveStep = () => activeStep === "step-5";

  const setPowerState = (off) => {
    isPoweredOff = off;
    screen.classList.toggle("powered-off", isPoweredOff);
    if (isPoweredOff) hideMuteIslandFeedback();
  };

  const getVolumeIcon = () => {
    if (volumeLevel <= 0) return "/assets/icons/muted.svg";
    if (volumeLevel <= 0.25) return "/assets/icons/volume-low.svg";
    if (volumeLevel <= 0.5) return "/assets/icons/volume-mid.svg";
    if (volumeLevel <= 0.75) return "/assets/icons/volume-high.svg";
    return "/assets/icons/volume-veryhigh.svg";
  };

  const showVolumeHud = (compact = false) => {
    volumeFill.style.height = `${Math.round(volumeLevel * 100)}%`;
    volumeGlyph.src = getVolumeIcon();
    volumeHud.classList.toggle("compact", compact);
    volumeHud.classList.add("visible");
    window.clearTimeout(hudTimer);
    hudTimer = window.setTimeout(() => {
      volumeHud.classList.remove("visible");
      volumeHud.classList.remove("compact");
    }, 820);
  };

  const setIslandFeedbackVisible = (visible) => {
    screen.classList.toggle("island-feedback-visible", visible);
  };

  const clearStatusLeftFade = () => {
    statusLeft.style.webkitMaskImage = "";
    statusLeft.style.maskImage = "";
  };

  const updateStatusLeftFade = () => {
    const pillRect = islandFeedbackPill.getBoundingClientRect();
    const statusRect = statusLeft.getBoundingClientRect();
    const statusWidth = statusRect.width;
    if (statusWidth <= 0) return;

    const overlap = statusRect.right - pillRect.left;
    const fadePx = Math.max(0, Math.min(statusWidth, overlap + 12));
    const fadeStartPx = Math.max(0, statusWidth - fadePx);
    const fadeSoftPx = Math.max(8, Math.min(22, fadePx * 0.42));
    const fadeStartPct = (fadeStartPx / statusWidth) * 100;
    const fadeMidPct = (Math.min(statusWidth, fadeStartPx + fadeSoftPx) / statusWidth) * 100;

    const mask = `linear-gradient(90deg, #000 0%, #000 ${fadeStartPct}%, rgba(0, 0, 0, 0.45) ${fadeMidPct}%, transparent 100%)`;
    statusLeft.style.webkitMaskImage = mask;
    statusLeft.style.maskImage = mask;
  };

  const animateStatusLeftFade = (duration = 340, clearAtEnd = false) => {
    if (statusFadeRaf) {
      window.cancelAnimationFrame(statusFadeRaf);
      statusFadeRaf = 0;
    }
    if (statusFadeLoopRaf) {
      window.cancelAnimationFrame(statusFadeLoopRaf);
      statusFadeLoopRaf = 0;
    }

    const start = performance.now();
    const tick = () => {
      updateStatusLeftFade();
      if (performance.now() - start < duration) {
        statusFadeRaf = window.requestAnimationFrame(tick);
      } else {
        statusFadeRaf = 0;
        if (clearAtEnd) clearStatusLeftFade();
      }
    };
    statusFadeRaf = window.requestAnimationFrame(tick);
  };

  const hideMuteIslandFeedback = () => {
    window.clearTimeout(islandFeedbackTimer);
    window.clearTimeout(islandFeedbackStateTimer);
    window.clearTimeout(islandFeedbackCloseTimer);
    window.clearTimeout(islandFeedbackVisibilityTimer);
    if (islandFeedbackRaf) {
      window.cancelAnimationFrame(islandFeedbackRaf);
      islandFeedbackRaf = 0;
    }
    if (statusFadeLoopRaf) {
      window.cancelAnimationFrame(statusFadeLoopRaf);
      statusFadeLoopRaf = 0;
    }
    islandFeedbackPill.classList.add("is-closing");
    islandFeedbackPill.classList.remove("is-active");
    islandFeedbackPill.style.setProperty("--feedback-pill-left", "50%");
    animateStatusLeftFade(320, true);
    islandFeedbackVisibilityTimer = window.setTimeout(() => setIslandFeedbackVisible(false), 220);
    islandFeedbackStateTimer = window.setTimeout(() => {
      islandFeedbackPill.classList.remove("is-closing");
      islandFeedbackPill.classList.remove("is-silent");
      islandFeedbackPill.classList.remove("is-ring");
    }, 210);
  };

  const showMuteIslandFeedback = (silentOn) => {
    window.clearTimeout(islandFeedbackVisibilityTimer);
    setIslandFeedbackVisible(true);
    islandFeedbackIcon.src = silentOn ? "/assets/icons/bell-muted.svg" : "/assets/icons/bell.svg";
    islandFeedbackLabel.textContent = silentOn ? "Silent" : "Ring";
    window.clearTimeout(islandFeedbackStateTimer);
    window.clearTimeout(islandFeedbackCloseTimer);
    if (statusFadeLoopRaf) {
      window.cancelAnimationFrame(statusFadeLoopRaf);
      statusFadeLoopRaf = 0;
    }
    islandFeedbackPill.classList.remove("is-closing");
    islandFeedbackPill.classList.toggle("is-silent", silentOn);
    islandFeedbackPill.classList.toggle("is-ring", !silentOn);

    window.clearTimeout(islandFeedbackTimer);
    if (islandFeedbackRaf) {
      window.cancelAnimationFrame(islandFeedbackRaf);
      islandFeedbackRaf = 0;
    }

    islandFeedbackRaf = window.requestAnimationFrame(() => {
      const screenRect = screen.getBoundingClientRect();
      const rightRect = islandFeedbackRight.getBoundingClientRect();
      const styles = getComputedStyle(islandFeedbackPill);

      const isWideIslandStep = activeStep === "step-2" || activeStep === "step-3";
      const baseWidthRatio = isWideIslandStep ? 0.415 : 0.268;
      const baseWidth = screenRect.width * baseWidthRatio;
      const gap = parseFloat(styles.getPropertyValue("--feedback-pill-gap")) || 12;
      const padX = parseFloat(styles.getPropertyValue("--feedback-pill-pad-x")) || 8;
      const padLeft = parseFloat(styles.getPropertyValue("--feedback-pill-pad-left")) || 6;
      const iconWidth = silentOn ? SILENT_ICON_PILL_WIDTH : RING_ICON_PILL_WIDTH;

      const leftSide = iconWidth + gap + padLeft;
      const rightSide = rightRect.width + gap + padX;
      const feedbackWidth = Math.ceil(baseWidth + leftSide + rightSide);
      const centerShift = (rightSide - leftSide) / 2;
      const feedbackLeft = Math.round(screenRect.width / 2 + centerShift);

      islandFeedbackPill.style.setProperty("--feedback-pill-center-width", `${Math.ceil(baseWidth)}px`);
      islandFeedbackCenter.style.width = `${Math.ceil(baseWidth)}px`;
      islandFeedbackPill.style.setProperty("--feedback-pill-base-width", `${Math.ceil(baseWidth)}px`);
      islandFeedbackPill.style.setProperty("--feedback-pill-expanded-width", `${feedbackWidth}px`);
      islandFeedbackPill.style.setProperty("--feedback-pill-left", `${feedbackLeft}px`);

      islandFeedbackPill.classList.remove("is-active");
      islandFeedbackPill.offsetWidth;
      islandFeedbackPill.classList.add("is-active");
      animateStatusLeftFade(340, false);

      const keepFadeSynced = () => {
        if (!screen.classList.contains("island-feedback-visible")) {
          statusFadeLoopRaf = 0;
          return;
        }
        updateStatusLeftFade();
        statusFadeLoopRaf = window.requestAnimationFrame(keepFadeSynced);
      };

      statusFadeLoopRaf = window.requestAnimationFrame(keepFadeSynced);
      islandFeedbackRaf = 0;
    });

    islandFeedbackTimer = window.setTimeout(() => {
      islandFeedbackPill.classList.add("is-closing");
      islandFeedbackPill.classList.remove("is-active");
      islandFeedbackPill.style.setProperty("--feedback-pill-left", "50%");
      if (statusFadeLoopRaf) {
        window.cancelAnimationFrame(statusFadeLoopRaf);
        statusFadeLoopRaf = 0;
      }
      animateStatusLeftFade(320, true);
      islandFeedbackCloseTimer = window.setTimeout(() => {
        islandFeedbackPill.classList.remove("is-closing");
      }, 220);
      islandFeedbackVisibilityTimer = window.setTimeout(() => setIslandFeedbackVisible(false), 220);
      islandFeedbackStateTimer = window.setTimeout(() => {
        islandFeedbackPill.classList.remove("is-silent");
        islandFeedbackPill.classList.remove("is-ring");
      }, 240);
    }, 1200);
  };

  const handlePower = () => {
    if (!isInteractiveStep()) return;
    setPowerState(!isPoweredOff);
    playTone("click");
  };

  const handleVolume = (up) => {
    if (!isInteractiveStep() || isPoweredOff) return;
    const now = performance.now();
    const buttonKey = up ? "up" : "down";
    const isDoublePress = buttonKey === lastVolumeButton && now - lastVolumePressAt <= DOUBLE_PRESS_WINDOW_MS;
    lastVolumePressAt = now;
    lastVolumeButton = buttonKey;
    if (isDoublePress) compactHudUntil = now + 1200;
    const shouldShowCompact = now < compactHudUntil;

    volumeLevel = Math.max(0, Math.min(1, volumeLevel + (up ? 0.14 : -0.14)));
    playTone(up ? "volume-up" : "volume-down");
    showVolumeHud(shouldShowCompact);
  };

  const handleActionButton = () => {
    if (!isInteractiveStep() || isPoweredOff) return;
    isMuted = !isMuted;
    showMuteIslandFeedback(isMuted);
    playTone(isMuted ? "mute" : "unmute");
  };

  const hideTopNotification = () => {
    window.clearTimeout(notificationTimer);
    window.clearTimeout(notificationLongPressTimer);
    notificationTimer = 0;
    notificationLongPressTimer = 0;
    notificationPointerId = null;
    notificationIsDragging = false;
    notificationDragY = 0;
    notificationDismissed = false;
    topNotification.style.removeProperty("--notification-drag-y");
    topNotification.classList.remove("is-dragging");
    topNotification.classList.remove("is-dismissed");
    topNotification.classList.remove("is-visible");
  };

  const showTopNotificationWithDelay = () => {
    window.clearTimeout(notificationTimer);
    notificationTimer = 0;
    if (notificationDismissed) return;
    topNotification.style.removeProperty("--notification-drag-y");
    topNotification.classList.remove("is-dragging");
    topNotification.classList.remove("is-dismissed");
    topNotification.classList.remove("is-visible");
    notificationTimer = window.setTimeout(() => {
      topNotification.classList.add("is-visible");
      notificationTimer = 0;
    }, 1000);
  };

  const tapTopNotification = () => {
    topNotification.classList.remove("is-tapped");
    void topNotification.offsetWidth;
    topNotification.classList.add("is-tapped");
  };

  const beginNotificationDrag = () => {
    notificationIsDragging = true;
    topNotification.classList.add("is-dragging");
    topNotification.classList.remove("is-tapped");
  };

  const endNotificationDrag = () => {
    topNotification.classList.remove("is-dragging");
    notificationIsDragging = false;
    if (notificationDragY <= NOTIFICATION_DISMISS_Y) {
      notificationDismissed = true;
      topNotification.classList.add("is-dismissed");
      topNotification.classList.remove("is-visible");
      topNotification.style.removeProperty("--notification-drag-y");
      notificationDragY = 0;
      return;
    }

    topNotification.style.removeProperty("--notification-drag-y");
    notificationDragY = 0;
  };

  const onNotificationPointerDown = (event) => {
    if (activeStep !== "step-5") return;
    if (!topNotification.classList.contains("is-visible")) return;
    if (notificationDismissed) return;
    notificationPointerId = event.pointerId;
    notificationStartY = event.clientY;
    notificationDragY = 0;
    notificationIsDragging = false;
    topNotification.setPointerCapture(event.pointerId);
    window.clearTimeout(notificationLongPressTimer);
    notificationLongPressTimer = window.setTimeout(() => {
      beginNotificationDrag();
      notificationLongPressTimer = 0;
    }, NOTIFICATION_LONG_PRESS_MS);
  };

  const onNotificationPointerMove = (event) => {
    if (event.pointerId !== notificationPointerId) return;
    if (!notificationIsDragging) return;
    const deltaY = event.clientY - notificationStartY;
    notificationDragY = Math.min(12, Math.max(-140, deltaY));
    topNotification.style.setProperty("--notification-drag-y", `${notificationDragY}px`);
  };

  const onNotificationPointerUp = (event) => {
    if (event.pointerId !== notificationPointerId) return;
    window.clearTimeout(notificationLongPressTimer);
    notificationLongPressTimer = 0;

    if (notificationIsDragging) {
      endNotificationDrag();
    } else {
      tapTopNotification();
    }

    if (topNotification.hasPointerCapture(event.pointerId)) {
      topNotification.releasePointerCapture(event.pointerId);
    }
    notificationPointerId = null;
  };

  const onNotificationPointerCancel = (event) => {
    if (event.pointerId !== notificationPointerId) return;
    window.clearTimeout(notificationLongPressTimer);
    notificationLongPressTimer = 0;
    if (notificationIsDragging) endNotificationDrag();
    if (topNotification.hasPointerCapture(event.pointerId)) {
      topNotification.releasePointerCapture(event.pointerId);
    }
    notificationPointerId = null;
  };

  const clearTerminalTimer = () => {
    if (terminalTimer) {
      window.clearTimeout(terminalTimer);
      terminalTimer = 0;
    }
  };

  const playProjectsTerminal = () => {
    if (terminalIsPlaying || terminalIsWaitingToReplay) return;
    terminalIsPlaying = true;
    terminalShouldLoop = true;
    projectsTerminalCode.textContent = "";

    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex >= TERMINAL_SCRIPT.length) {
        terminalIsPlaying = false;
        if (!terminalShouldLoop) {
          terminalTimer = 0;
          return;
        }
        terminalIsWaitingToReplay = true;
        terminalTimer = window.setTimeout(() => {
          terminalIsWaitingToReplay = false;
          terminalTimer = 0;
          playProjectsTerminal();
        }, 10000);
        return;
      }

      const step = TERMINAL_SCRIPT[stepIndex];
      stepIndex += 1;

      if (step.pause) {
        terminalTimer = window.setTimeout(runStep, step.pause);
        return;
      }

      const text = step.text || "";
      const speed = step.speed || 18;
      const variance = step.variance || 0;
      let charIndex = 0;

      const typeNext = () => {
        if (charIndex >= text.length) {
          runStep();
          return;
        }

        projectsTerminalCode.textContent += text.charAt(charIndex);
        charIndex += 1;
        terminalTimer = window.setTimeout(typeNext, getTypingDelay(speed, variance));
      };

      typeNext();
    };

    runStep();
  };

  const stopProjectsTerminal = () => {
    terminalShouldLoop = false;
    terminalIsPlaying = false;
    terminalIsWaitingToReplay = false;
    clearTerminalTimer();
  };

  const shouldAutoplayTerminalOnMobile = () => {
    return window.matchMedia && window.matchMedia("(max-width: 900px)").matches;
  };

  const onPointerDownByButton = new Map();
  const onClickByButton = new Map();
  phoneButtons.forEach((button) => {
    const onPointerDown = () => {
      if (isInteractiveStep()) playTone("click");
      pressButton(button);
    };
    const onClick = () => pressButton(button);
    onPointerDownByButton.set(button, onPointerDown);
    onClickByButton.set(button, onClick);
    button.addEventListener("pointerdown", onPointerDown);
    button.addEventListener("click", onClick);
  });

  powerButton.addEventListener("click", handlePower);
  const onVolumeUpClick = () => handleVolume(true);
  const onVolumeDownClick = () => handleVolume(false);
  volumeUpButton.addEventListener("click", onVolumeUpClick);
  volumeDownButton.addEventListener("click", onVolumeDownClick);
  actionButton.addEventListener("click", handleActionButton);
  topNotification.addEventListener("pointerdown", onNotificationPointerDown);
  topNotification.addEventListener("pointermove", onNotificationPointerMove);
  topNotification.addEventListener("pointerup", onNotificationPointerUp);
  topNotification.addEventListener("pointercancel", onNotificationPointerCancel);

  const updateStep = () => {
    const rect = scene.getBoundingClientRect();
    const scrollable = scene.offsetHeight - window.innerHeight;
    const traveled = Math.min(Math.max(-rect.top, 0), scrollable);
    const p = scrollable > 0 ? traveled / scrollable : 0;

    let step = "step-0";
    if (p >= 0.06) step = "step-1";
    if (p >= 0.14) step = "step-2";
    if (p >= 0.19) step = "step-3";
    if (p >= 0.31) step = "step-5";
    if (p >= 0.53) step = "step-6";
    if (p >= 0.67) step = "step-7";
    if (p >= 0.79) step = "step-8";
    if (p >= 0.89) step = "step-9";

    const prevStep = activeStep;

    activeStep = step;

    if (activeStep !== "step-5") {
      setPowerState(false);
      volumeHud.classList.remove("visible");
      hideMuteIslandFeedback();
    }

    if (activeStep === "step-5") {
      if (!topNotification.classList.contains("is-visible") && !notificationTimer) {
        showTopNotificationWithDelay();
      }
    } else {
      hideTopNotification();
    }

    if (activeStep === "step-9" || shouldAutoplayTerminalOnMobile()) {
      playProjectsTerminal();
    } else {
      stopProjectsTerminal();
    }

    if (prevStep !== step) {
      stage.classList.remove("step-0", "step-1", "step-2", "step-3", "step-5", "step-6", "step-7", "step-8", "step-9");
      stage.classList.add(step);
    }
  };

  window.addEventListener("scroll", updateStep, { passive: true });
  window.addEventListener("resize", updateStep);

  const onDockClickByApp = new Map();
  dockApps.forEach((app) => {
    const onDockClick = () => {
      app.classList.remove("is-tapped");
      void app.offsetWidth;
      app.classList.add("is-tapped");
    };
    onDockClickByApp.set(app, onDockClick);
    app.addEventListener("click", onDockClick);
  });

  startLockClock();
  updateStep();

  return () => {
    window.removeEventListener("scroll", updateStep);
    window.removeEventListener("resize", updateStep);

    phoneButtons.forEach((button) => {
      const onPointerDown = onPointerDownByButton.get(button);
      const onClick = onClickByButton.get(button);
      if (onPointerDown) button.removeEventListener("pointerdown", onPointerDown);
      if (onClick) button.removeEventListener("click", onClick);
    });

    powerButton.removeEventListener("click", handlePower);
    volumeUpButton.removeEventListener("click", onVolumeUpClick);
    volumeDownButton.removeEventListener("click", onVolumeDownClick);
    actionButton.removeEventListener("click", handleActionButton);
    topNotification.removeEventListener("pointerdown", onNotificationPointerDown);
    topNotification.removeEventListener("pointermove", onNotificationPointerMove);
    topNotification.removeEventListener("pointerup", onNotificationPointerUp);
    topNotification.removeEventListener("pointercancel", onNotificationPointerCancel);

    dockApps.forEach((app) => {
      const onDockClick = onDockClickByApp.get(app);
      if (onDockClick) app.removeEventListener("click", onDockClick);
    });

    window.clearTimeout(hudTimer);
    window.clearTimeout(islandFeedbackTimer);
    window.clearTimeout(islandFeedbackStateTimer);
    window.clearTimeout(islandFeedbackCloseTimer);
    window.clearTimeout(islandFeedbackVisibilityTimer);
    window.clearTimeout(notificationTimer);
    window.clearTimeout(notificationLongPressTimer);
    clearTerminalTimer();
    window.clearInterval(lockClockTimer);
    if (statusFadeRaf) window.cancelAnimationFrame(statusFadeRaf);
    if (statusFadeLoopRaf) window.cancelAnimationFrame(statusFadeLoopRaf);
    if (islandFeedbackRaf) window.cancelAnimationFrame(islandFeedbackRaf);
  };
}
