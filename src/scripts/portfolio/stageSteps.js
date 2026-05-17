const STAGE_STEP_CLASSES = ["step-0", "step-1", "step-2", "step-3", "step-5", "step-6", "step-7"];

function getStepFromProgress(progress, isCompactViewport) {
  let step = "step-0";
  if (progress >= 0.12) step = "step-1";
  if (progress >= 0.28) step = "step-2";
  if (progress >= 0.42) step = "step-3";
  if (progress >= 0.53) step = "step-5";
  if (progress >= 0.68) step = "step-6";
  if (progress >= 0.82) step = "step-7";
  if (isCompactViewport()) step = "step-5";
  return step;
}

export function createStageStepController({ scene, stage, isCompactViewport, initialStep = "step-0", onStepChange }) {
  let activeStep = initialStep;

  const update = () => {
    const rect = scene.getBoundingClientRect();
    const scrollable = scene.offsetHeight - window.innerHeight;
    const traveled = Math.min(Math.max(-rect.top, 0), scrollable);
    const progress = scrollable > 0 ? traveled / scrollable : 0;
    const nextStep = getStepFromProgress(progress, isCompactViewport);
    const prevStep = activeStep;
    activeStep = nextStep;

    if (prevStep !== nextStep) {
      stage.classList.remove(...STAGE_STEP_CLASSES);
      stage.classList.add(nextStep);
    }

    if (onStepChange) onStepChange({ prevStep, nextStep });
  };

  const getActiveStep = () => activeStep;

  return { update, getActiveStep };
}
