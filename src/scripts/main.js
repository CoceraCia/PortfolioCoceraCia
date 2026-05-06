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
    const volumeLabel = document.getElementById("volumeLabel");
    const muteToast = document.getElementById("muteToast");
    const lockDate = document.getElementById("lockDate");
    const lockTime = document.getElementById("lockTime");

    let audioCtx;
    let lastToneAt = 0;
    let volumeLevel = 0.58;
    let isMuted = false;
    let isPoweredOff = false;
    let activeStep = "step-0";
    let hudTimer;
    let toastTimer;
    let lockClockTimer;

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
    };

    const showVolumeHud = () => {
      volumeLabel.textContent = isMuted ? "Silent" : "Ringer";
      volumeFill.style.width = `${Math.round(volumeLevel * 100)}%`;
      volumeHud.classList.add("visible");
      window.clearTimeout(hudTimer);
      hudTimer = window.setTimeout(() => {
        volumeHud.classList.remove("visible");
      }, 820);
    };

    const showMuteToast = (silentOn) => {
      muteToast.textContent = silentOn ? "Silent mode on" : "Silent mode off";
      muteToast.classList.add("visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        muteToast.classList.remove("visible");
      }, 1200);
    };

    const handlePower = () => {
      if (!isInteractiveStep()) return;
      setPowerState(!isPoweredOff);
      playTone("click");
    };

    const handleVolume = (up) => {
      if (!isInteractiveStep() || isPoweredOff) return;
      const delta = up ? 0.14 : -0.14;
      volumeLevel = Math.max(0, Math.min(1, volumeLevel + delta));
      if (volumeLevel > 0 && isMuted) {
        isMuted = false;
        showMuteToast(false);
        playTone("unmute");
      } else {
        playTone(up ? "volume-up" : "volume-down");
      }
      if (volumeLevel === 0 && !isMuted) {
        isMuted = true;
        showMuteToast(true);
        playTone("mute");
      }
      showVolumeHud();
    };

    const handleActionButton = () => {
      if (!isInteractiveStep() || isPoweredOff) return;
      isMuted = !isMuted;
      if (isMuted) volumeLevel = Math.max(0, volumeLevel - 0.22);
      showMuteToast(isMuted);
      playTone(isMuted ? "mute" : "unmute");
      showVolumeHud();
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
        muteToast.classList.remove("visible");
      }

      stage.classList.remove("step-0", "step-1", "step-2", "step-3", "step-4", "step-5", "step-6");
      stage.classList.add(step);
    };

    window.addEventListener("scroll", updateStep, { passive: true });
    window.addEventListener("resize", updateStep);
    startLockClock();
    updateStep();
