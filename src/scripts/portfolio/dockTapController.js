export function createDockTapController(dockApps) {
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

  const cleanup = () => {
    dockApps.forEach((app) => {
      const onDockClick = onDockClickByApp.get(app);
      if (onDockClick) app.removeEventListener("click", onDockClick);
    });
  };

  return { cleanup };
}
