import { KIZAMU_TERMINAL_SCRIPT, REMOTE_LOG_TERMINAL_SCRIPT } from "./portfolio/terminalScripts";
import { createTerminalPlaybackController } from "./portfolio/terminalPlayback";
import { createScrollRevealController } from "./portfolio/scrollReveal";
import { createStageStepController } from "./portfolio/stageSteps";
import { createNotificationController } from "./portfolio/notificationController";
import { createIslandFeedbackController } from "./portfolio/islandFeedbackController";
import { createPhoneControlsController } from "./portfolio/phoneControlsController";
import { createLockClockController } from "./portfolio/lockClockController";
import { createDockTapController } from "./portfolio/dockTapController";

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
  const projectsPanel = document.querySelector(".projects-panel");
  const projectsTerminalCode = document.getElementById("projectsTerminalCode");
  const remoteLogPanel = document.querySelector(".remotelog-panel");
  const remoteLogTerminalCode = document.getElementById("remoteLogTerminalCode");
  const revealTargets = document.querySelectorAll(".scroll-reveal");

  if (!stage || !scene || !screen || !actionButton || !volumeUpButton || !volumeDownButton || !powerButton || !volumeHud || !volumeFill || !volumeGlyph || !statusLeft || !islandFeedbackPill || !islandFeedbackIcon || !islandFeedbackLabel || !islandFeedbackCenter || !islandFeedbackRight || !lockDate || !lockTime || !topNotification || !projectsPanel || !projectsTerminalCode || !remoteLogPanel || !remoteLogTerminalCode) {
    return () => {};
  }

  let activeStep = "step-0";

  const SILENT_ICON_PILL_WIDTH = 56;
  const RING_ICON_PILL_WIDTH = 22;
  const isCompactViewport = () => window.matchMedia && window.matchMedia("(max-width: 900px)").matches;

  const terminalConfigs = [
    { id: "kizamu-terminal", panelEl: projectsPanel, codeEl: projectsTerminalCode, script: KIZAMU_TERMINAL_SCRIPT },
    { id: "remotelog-terminal", panelEl: remoteLogPanel, codeEl: remoteLogTerminalCode, script: REMOTE_LOG_TERMINAL_SCRIPT },
  ];
  const terminalPlayback = createTerminalPlaybackController(terminalConfigs);
  const scrollReveal = createScrollRevealController(revealTargets);
  const islandFeedback = createIslandFeedbackController({
    screen,
    statusLeft,
    islandFeedbackPill,
    islandFeedbackIcon,
    islandFeedbackLabel,
    islandFeedbackCenter,
    islandFeedbackRight,
    getActiveStep: () => activeStep,
    silentIconPillWidth: SILENT_ICON_PILL_WIDTH,
    ringIconPillWidth: RING_ICON_PILL_WIDTH,
  });
  const notification = createNotificationController({
    topNotification,
    getActiveStep: () => activeStep,
  });
  const phoneControls = createPhoneControlsController({
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
    getIsInteractiveStep: () => activeStep === "step-5" || isCompactViewport(),
    phoneSoundEnabled: false,
  });
  const lockClock = createLockClockController({ lockDate, lockTime });
  const dockTap = createDockTapController(dockApps);
  const stageStep = createStageStepController({
    scene,
    stage,
    isCompactViewport,
    initialStep: activeStep,
    onStepChange: ({ nextStep }) => {
      activeStep = nextStep;

      if (activeStep !== "step-5") {
        phoneControls.resetForNonInteractiveStep();
      }

      if (activeStep === "step-5") {
        if (!topNotification.classList.contains("is-visible") && !notification.isShowPending()) {
          notification.showWithDelay();
        }
      } else {
        notification.hide();
      }
    },
  });

  const updateTerminalsVisibility = () => terminalPlayback.updateVisibility();
  topNotification.addEventListener("pointerdown", notification.onPointerDown);
  topNotification.addEventListener("pointermove", notification.onPointerMove);
  topNotification.addEventListener("pointerup", notification.onPointerUp);
  topNotification.addEventListener("pointercancel", notification.onPointerCancel);

  const updateStep = () => stageStep.update();

  window.addEventListener("scroll", updateStep, { passive: true });
  window.addEventListener("scroll", updateTerminalsVisibility, { passive: true });
  window.addEventListener("resize", updateStep);
  window.addEventListener("resize", updateTerminalsVisibility);

  lockClock.start();
  scrollReveal.setup();
  updateStep();
  updateTerminalsVisibility();

  return () => {
    window.removeEventListener("scroll", updateStep);
    window.removeEventListener("scroll", updateTerminalsVisibility);
    window.removeEventListener("resize", updateStep);
    window.removeEventListener("resize", updateTerminalsVisibility);

    topNotification.removeEventListener("pointerdown", notification.onPointerDown);
    topNotification.removeEventListener("pointermove", notification.onPointerMove);
    topNotification.removeEventListener("pointerup", notification.onPointerUp);
    topNotification.removeEventListener("pointercancel", notification.onPointerCancel);

    scrollReveal.cleanup();

    phoneControls.cleanup();
    dockTap.cleanup();
    islandFeedback.cleanup();
    notification.cleanup();
    terminalPlayback.stopAll();
    lockClock.cleanup();
  };
}
