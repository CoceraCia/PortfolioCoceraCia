export function createScrollRevealController(revealTargets) {
  let revealObserver = null;

  const setup = () => {
    if (!revealTargets.length) return;

    document.documentElement.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -12% 0px",
    });

    revealTargets.forEach((target, index) => {
      target.style.setProperty("--reveal-index", index % 4);
      revealObserver.observe(target);
    });
  };

  const cleanup = () => {
    if (revealObserver) revealObserver.disconnect();
    revealTargets.forEach((target) => {
      target.classList.remove("is-visible");
      target.style.removeProperty("--reveal-index");
    });
    document.documentElement.classList.remove("reveal-ready");
  };

  return { setup, cleanup };
}
