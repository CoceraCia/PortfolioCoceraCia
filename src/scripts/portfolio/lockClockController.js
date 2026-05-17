export function createLockClockController({ lockDate, lockTime }) {
  let lockClockTimer = 0;

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

  const update = () => {
    const now = new Date();
    lockDate.textContent = dateFormatter.format(now);
    lockTime.textContent = timeFormatter.format(now);
  };

  const start = () => {
    update();
    if (lockClockTimer) window.clearInterval(lockClockTimer);
    lockClockTimer = window.setInterval(update, 1000);
  };

  const cleanup = () => {
    if (lockClockTimer) window.clearInterval(lockClockTimer);
    lockClockTimer = 0;
  };

  return { start, cleanup };
}
