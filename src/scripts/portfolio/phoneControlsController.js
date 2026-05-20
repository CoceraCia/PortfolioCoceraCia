export function createPhoneControlsController({
  screen,
  phoneButtons,
  actionButton,
  volumeUpButton,
  volumeDownButton,
  powerButton,
  volumeHud,
  volumeFill,
  volumeGlyph,
  islandFeedback,
  getIsInteractiveStep,
  phoneSoundEnabled = false,
}) {
  let audioCtx;
  let lastToneAt = 0;
  let volumeLevel = 0.58;
  let isMuted = false;
  let isPoweredOff = false;
  let hudTimer = 0;
  let lastVolumePressAt = 0;
  let lastVolumeButton = "";
  let compactHudUntil = 0;

  const DOUBLE_PRESS_WINDOW_MS = 360;

  const ensureAudioContext = async () => {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === "suspended") {
      try {
        await audioCtx.resume();
      } catch {
        return null;
      }
    }
    return audioCtx;
  };

  const playTone = async (type) => {
    if (!phoneSoundEnabled) return;

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

  const setPowerState = (off) => {
    isPoweredOff = off;
    screen.classList.toggle("powered-off", isPoweredOff);
    if (isPoweredOff) islandFeedback.hide();
  };

  const getVolumeIcon = () => {
    if (volumeLevel <= 0) return "/assets/icons/device/muted.svg";
    if (volumeLevel <= 0.25) return "/assets/icons/device/volume-low.svg";
    if (volumeLevel <= 0.5) return "/assets/icons/device/volume-medium.svg";
    if (volumeLevel <= 0.75) return "/assets/icons/device/volume-high.svg";
    return "/assets/icons/device/volume-very-high.svg";
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

  const handlePower = () => {
    if (!getIsInteractiveStep()) return;
    setPowerState(!isPoweredOff);
    playTone("click");
  };

  const handleVolume = (up) => {
    if (!getIsInteractiveStep() || isPoweredOff) return;
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
    if (!getIsInteractiveStep() || isPoweredOff) return;
    isMuted = !isMuted;
    islandFeedback.show(isMuted);
    playTone(isMuted ? "mute" : "unmute");
  };

  const onPointerDownByButton = new Map();
  const onClickByButton = new Map();
  phoneButtons.forEach((button) => {
    const onPointerDown = () => {
      if (getIsInteractiveStep()) playTone("click");
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

  const resetForNonInteractiveStep = () => {
    setPowerState(false);
    volumeHud.classList.remove("visible");
    islandFeedback.hide();
  };

  const cleanup = () => {
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

    window.clearTimeout(hudTimer);
  };

  return { resetForNonInteractiveStep, cleanup };
}
