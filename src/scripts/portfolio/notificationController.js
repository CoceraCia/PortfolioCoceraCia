export function createNotificationController({ topNotification, getActiveStep, longPressMs = 240, dismissY = -56 }) {
  let notificationTimer = 0;
  let notificationLongPressTimer = 0;
  let notificationPointerId = null;
  let notificationStartY = 0;
  let notificationDragY = 0;
  let notificationIsDragging = false;
  let notificationDismissed = false;

  const clearTimers = () => {
    window.clearTimeout(notificationTimer);
    window.clearTimeout(notificationLongPressTimer);
    notificationTimer = 0;
    notificationLongPressTimer = 0;
  };

  const resetVisualState = () => {
    topNotification.style.removeProperty("--notification-drag-y");
    topNotification.classList.remove("is-dragging");
    topNotification.classList.remove("is-dismissed");
    topNotification.classList.remove("is-visible");
  };

  const hide = () => {
    clearTimers();
    notificationPointerId = null;
    notificationIsDragging = false;
    notificationDragY = 0;
    notificationDismissed = false;
    resetVisualState();
  };

  const showWithDelay = () => {
    window.clearTimeout(notificationTimer);
    notificationTimer = 0;
    if (notificationDismissed) return;
    resetVisualState();
    notificationTimer = window.setTimeout(() => {
      topNotification.classList.add("is-visible");
      notificationTimer = 0;
    }, 1000);
  };

  const tap = () => {
    topNotification.classList.remove("is-tapped");
    void topNotification.offsetWidth;
    topNotification.classList.add("is-tapped");
  };

  const beginDrag = () => {
    notificationIsDragging = true;
    topNotification.classList.add("is-dragging");
    topNotification.classList.remove("is-tapped");
  };

  const endDrag = () => {
    topNotification.classList.remove("is-dragging");
    notificationIsDragging = false;
    if (notificationDragY <= dismissY) {
      notificationDismissed = true;
      topNotification.classList.add("is-dismissed");
      topNotification.classList.remove("is-visible");
      topNotification.style.removeProperty("--notification-drag-y");
      notificationDragY = 0;
      return;
    }

    topNotification.style.removeProperty("--notification-drag-y");
    notificationDragY = 0;
  };

  const onPointerDown = (event) => {
    if (getActiveStep() !== "step-5") return;
    if (!topNotification.classList.contains("is-visible")) return;
    if (notificationDismissed) return;

    notificationPointerId = event.pointerId;
    notificationStartY = event.clientY;
    notificationDragY = 0;
    notificationIsDragging = false;
    topNotification.setPointerCapture(event.pointerId);
    window.clearTimeout(notificationLongPressTimer);
    notificationLongPressTimer = window.setTimeout(() => {
      beginDrag();
      notificationLongPressTimer = 0;
    }, longPressMs);
  };

  const onPointerMove = (event) => {
    if (event.pointerId !== notificationPointerId) return;
    if (!notificationIsDragging) return;
    const deltaY = event.clientY - notificationStartY;
    notificationDragY = Math.min(12, Math.max(-140, deltaY));
    topNotification.style.setProperty("--notification-drag-y", `${notificationDragY}px`);
  };

  const onPointerUp = (event) => {
    if (event.pointerId !== notificationPointerId) return;
    window.clearTimeout(notificationLongPressTimer);
    notificationLongPressTimer = 0;

    if (notificationIsDragging) endDrag();
    else tap();

    if (topNotification.hasPointerCapture(event.pointerId)) {
      topNotification.releasePointerCapture(event.pointerId);
    }
    notificationPointerId = null;
  };

  const onPointerCancel = (event) => {
    if (event.pointerId !== notificationPointerId) return;
    window.clearTimeout(notificationLongPressTimer);
    notificationLongPressTimer = 0;
    if (notificationIsDragging) endDrag();
    if (topNotification.hasPointerCapture(event.pointerId)) {
      topNotification.releasePointerCapture(event.pointerId);
    }
    notificationPointerId = null;
  };

  const isShowPending = () => notificationTimer !== 0;

  const cleanup = () => {
    hide();
  };

  return {
    showWithDelay,
    hide,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    isShowPending,
    cleanup,
  };
}
