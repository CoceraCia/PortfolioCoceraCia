export function createIslandFeedbackController({
  screen,
  statusLeft,
  islandFeedbackPill,
  islandFeedbackIcon,
  islandFeedbackLabel,
  islandFeedbackCenter,
  islandFeedbackRight,
  getActiveStep,
  silentIconPillWidth = 56,
  ringIconPillWidth = 22,
}) {
  let islandFeedbackTimer = 0;
  let islandFeedbackRaf = 0;
  let islandFeedbackStateTimer = 0;
  let islandFeedbackCloseTimer = 0;
  let islandFeedbackVisibilityTimer = 0;
  let statusFadeRaf = 0;
  let statusFadeLoopRaf = 0;

  const setVisible = (visible) => {
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

  const hide = () => {
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
    islandFeedbackVisibilityTimer = window.setTimeout(() => setVisible(false), 220);
    islandFeedbackStateTimer = window.setTimeout(() => {
      islandFeedbackPill.classList.remove("is-closing");
      islandFeedbackPill.classList.remove("is-silent");
      islandFeedbackPill.classList.remove("is-ring");
    }, 210);
  };

  const show = (silentOn) => {
    window.clearTimeout(islandFeedbackVisibilityTimer);
    setVisible(true);
    islandFeedbackIcon.src = silentOn ? "/assets/icons/device/bell-muted.svg" : "/assets/icons/device/bell.svg";
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

      const activeStep = getActiveStep();
      const isWideIslandStep = activeStep === "step-2" || activeStep === "step-3";
      const baseWidthRatio = isWideIslandStep ? 0.415 : 0.268;
      const baseWidth = screenRect.width * baseWidthRatio;
      const gap = parseFloat(styles.getPropertyValue("--feedback-pill-gap")) || 12;
      const padX = parseFloat(styles.getPropertyValue("--feedback-pill-pad-x")) || 8;
      const padLeft = parseFloat(styles.getPropertyValue("--feedback-pill-pad-left")) || 6;
      const iconWidth = silentOn ? silentIconPillWidth : ringIconPillWidth;

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
      islandFeedbackVisibilityTimer = window.setTimeout(() => setVisible(false), 220);
      islandFeedbackStateTimer = window.setTimeout(() => {
        islandFeedbackPill.classList.remove("is-silent");
        islandFeedbackPill.classList.remove("is-ring");
      }, 240);
    }, 1200);
  };

  const cleanup = () => {
    hide();
    if (statusFadeRaf) window.cancelAnimationFrame(statusFadeRaf);
    if (statusFadeLoopRaf) window.cancelAnimationFrame(statusFadeLoopRaf);
    if (islandFeedbackRaf) window.cancelAnimationFrame(islandFeedbackRaf);
  };

  return { show, hide, cleanup };
}
