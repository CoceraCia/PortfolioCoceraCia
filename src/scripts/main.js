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
    let lastVolumePressAt = 0;
    let lastVolumeButton = "";
    let compactHudUntil = 0;

    const DOUBLE_PRESS_WINDOW_MS = 360;
    const SILENT_ICON_PILL_WIDTH = 56;
    const RING_ICON_PILL_WIDTH = 22;

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
      if (isPoweredOff) {
        hideMuteIslandFeedback();
      }
    };

    const getVolumeIcon = () => {
      if (volumeLevel <= 0) return "./assets/icons/muted.svg";
      if (volumeLevel <= 0.25) return "./assets/icons/volume-low.svg";
      if (volumeLevel <= 0.5) return "./assets/icons/volume-mid.svg";
      if (volumeLevel <= 0.75) return "./assets/icons/volume-high.svg";
      return "./assets/icons/volume-veryhigh.svg";
    };

    const showVolumeHud = (compact = false) => {
      volumeFill.style.height = `${Math.round(volumeLevel * 100)}%`;
      if (volumeGlyph) {
        volumeGlyph.src = getVolumeIcon();
      }
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
      if (!statusLeft) return;
      statusLeft.style.webkitMaskImage = "";
      statusLeft.style.maskImage = "";
    };

    const updateStatusLeftFade = () => {
      if (!statusLeft) return;

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
      islandFeedbackVisibilityTimer = window.setTimeout(() => {
        setIslandFeedbackVisible(false);
      }, 220);
      islandFeedbackStateTimer = window.setTimeout(() => {
        islandFeedbackPill.classList.remove("is-closing");
        islandFeedbackPill.classList.remove("is-silent");
        islandFeedbackPill.classList.remove("is-ring");
      }, 210);
    };

    const showMuteIslandFeedback = (silentOn) => {
      window.clearTimeout(islandFeedbackVisibilityTimer);
      setIslandFeedbackVisible(true);
      islandFeedbackIcon.src = silentOn ? "./assets/icons/bell-muted.svg" : "./assets/icons/bell.svg";
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
        const leftPad = padLeft;
        const rightPad = padX;

        const leftSide = iconWidth + gap + leftPad;
        const rightSide = rightRect.width + gap + rightPad;
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
        islandFeedbackVisibilityTimer = window.setTimeout(() => {
          setIslandFeedbackVisible(false);
        }, 220);
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

      const delta = up ? 0.14 : -0.14;
      volumeLevel = Math.max(0, Math.min(1, volumeLevel + delta));
      playTone(up ? "volume-up" : "volume-down");
      showVolumeHud(shouldShowCompact);
    };

    const handleActionButton = () => {
      if (!isInteractiveStep() || isPoweredOff) return;
      isMuted = !isMuted;
      showMuteIslandFeedback(isMuted);
      playTone(isMuted ? "mute" : "unmute");
    };

    phoneButtons.forEach((button) => {
      button.addEventListener("pointerdown", () => {
        if (isInteractiveStep()) playTone("click");
        pressButton(button);
      });

      button.addEventListener("click", () => {
        pressButton(button);
      });
    });

    powerButton.addEventListener("click", handlePower);
    volumeUpButton.addEventListener("click", () => handleVolume(true));
    volumeDownButton.addEventListener("click", () => handleVolume(false));
    actionButton.addEventListener("click", handleActionButton);

    const updateStep = () => {
      const rect = scene.getBoundingClientRect();
      const scrollable = scene.offsetHeight - window.innerHeight;
      const traveled = Math.min(Math.max(-rect.top, 0), scrollable);
      const p = scrollable > 0 ? traveled / scrollable : 0;

      let step = "step-0";
      if (p >= 0.12) step = "step-1";
      if (p >= 0.29) step = "step-2";
      if (p >= 0.47) step = "step-3";
      if (p >= 0.62) step = "step-4";
      if (p >= 0.62) step = "step-5";
      activeStep = step;

      if (activeStep !== "step-5") {
        setPowerState(false);
        volumeHud.classList.remove("visible");
        hideMuteIslandFeedback();
      }

      stage.classList.remove("step-0", "step-1", "step-2", "step-3", "step-4", "step-5", "step-6");
      stage.classList.add(step);
    };

    const glassCard = document.getElementById("glassCard");
    const displacementMap = document.querySelector("#glass-distortion feDisplacementMap");

    if (glassCard && displacementMap) {
      glassCard.addEventListener("mousemove", (e) => {
        const rect = glassCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scaleX = (x / rect.width) * 100;
        const scaleY = (y / rect.height) * 100;
        displacementMap.setAttribute("scale", Math.min(scaleX, scaleY));

        const specular = glassCard.querySelector(".glass-specular");
        if (specular) {
          specular.style.background = `
            radial-gradient(
              circle at ${x}px ${y}px,
              rgba(255, 255, 255, 0.22) 0%,
              rgba(255, 255, 255, 0.08) 32%,
              rgba(255, 255, 255, 0) 62%
            )
          `;
        }
      });

      glassCard.addEventListener("mouseleave", () => {
        displacementMap.setAttribute("scale", "77");
        const specular = glassCard.querySelector(".glass-specular");
        if (specular) {
          specular.style.background = "none";
        }
      });
    }

    window.addEventListener("scroll", updateStep, { passive: true });
    window.addEventListener("resize", updateStep);
    startLockClock();
    updateStep();
