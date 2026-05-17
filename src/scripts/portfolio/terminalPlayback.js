export function createTerminalPlaybackController(configs) {
  const terminalStateById = new Map();

  const getTypingDelay = (base, variance = 0) => {
    const jitter = variance > 0 ? Math.random() * variance * 2 - variance : 0;
    return Math.max(10, Math.round(base + jitter));
  };

  const ensureTerminalState = (id) => {
    if (terminalStateById.has(id)) return terminalStateById.get(id);
    const state = {
      timer: 0,
      isPlaying: false,
      shouldLoop: false,
      isWaitingToReplay: false,
      isInView: false,
    };
    terminalStateById.set(id, state);
    return state;
  };

  const clearTerminalTimer = (state) => {
    if (!state.timer) return;
    window.clearTimeout(state.timer);
    state.timer = 0;
  };

  const playTerminal = (config) => {
    const state = ensureTerminalState(config.id);
    if (state.isPlaying || state.isWaitingToReplay) return;
    state.isPlaying = true;
    state.shouldLoop = true;
    config.codeEl.textContent = "";

    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex >= config.script.length) {
        state.isPlaying = false;
        if (!state.shouldLoop) {
          state.timer = 0;
          return;
        }
        state.isWaitingToReplay = true;
        state.timer = window.setTimeout(() => {
          state.isWaitingToReplay = false;
          state.timer = 0;
          playTerminal(config);
        }, 10000);
        return;
      }

      const step = config.script[stepIndex];
      stepIndex += 1;

      if (step.clear) {
        config.codeEl.textContent = "";
        state.timer = window.setTimeout(runStep, step.pause || 0);
        return;
      }

      if (step.pause) {
        state.timer = window.setTimeout(runStep, step.pause);
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

        config.codeEl.textContent += text.charAt(charIndex);
        charIndex += 1;
        state.timer = window.setTimeout(typeNext, getTypingDelay(speed, variance));
      };

      typeNext();
    };

    runStep();
  };

  const stopTerminal = (config) => {
    const state = ensureTerminalState(config.id);
    state.shouldLoop = false;
    state.isPlaying = false;
    state.isWaitingToReplay = false;
    clearTerminalTimer(state);
  };

  const updateVisibility = () => {
    configs.forEach((config) => {
      const state = ensureTerminalState(config.id);
      const rect = config.panelEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const nextIsInView = rect.top < viewportHeight * 0.78 && rect.bottom > viewportHeight * 0.18;

      if (state.isInView === nextIsInView) return;
      state.isInView = nextIsInView;
      if (state.isInView) playTerminal(config);
      else stopTerminal(config);
    });
  };

  const stopAll = () => {
    configs.forEach((config) => stopTerminal(config));
  };

  return { updateVisibility, stopAll };
}
