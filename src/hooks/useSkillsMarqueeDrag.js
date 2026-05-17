import { useEffect } from "react";

export default function useSkillsMarqueeDrag({ marqueeRef, trackRef, onDraggingChange }) {
  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!track || !marquee) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let position = 0;
    let rafId;
    let isPointerDown = false;
    let activePointerId = null;
    let pointerStartX = 0;
    let dragStartPosition = 0;
    let autoResumeAt = 0;
    let pausedByHover = false;
    let velocityX = 0;
    let lastMoveX = 0;
    let lastMoveTs = 0;

    const getLoopWidth = () => track.scrollWidth / 2;

    const normalizePosition = (rawPosition) => {
      const loopWidth = getLoopWidth();
      if (!loopWidth) return rawPosition;
      return ((rawPosition % loopWidth) + loopWidth) % loopWidth;
    };

    const applyTransform = () => {
      track.style.transform = `translateX(${-position}px)`;
    };

    const pauseAutoScroll = (ms = 0) => {
      autoResumeAt = performance.now() + ms;
    };

    const onPointerDown = (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      isPointerDown = true;
      activePointerId = event.pointerId;
      pointerStartX = event.clientX;
      dragStartPosition = position;
      velocityX = 0;
      lastMoveX = event.clientX;
      lastMoveTs = performance.now();
      onDraggingChange(true);
      pauseAutoScroll(500);
      marquee.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!isPointerDown || event.pointerId !== activePointerId) return;
      const deltaX = event.clientX - pointerStartX;
      position = normalizePosition(dragStartPosition - deltaX);
      applyTransform();

      const now = performance.now();
      const elapsed = now - lastMoveTs;
      if (elapsed > 0) {
        velocityX = (event.clientX - lastMoveX) / elapsed;
        lastMoveX = event.clientX;
        lastMoveTs = now;
      }
    };

    const finishDrag = (event) => {
      if (event && event.pointerId !== activePointerId) return;
      if (isPointerDown && activePointerId !== null && marquee.hasPointerCapture(activePointerId)) {
        marquee.releasePointerCapture(activePointerId);
      }
      isPointerDown = false;
      activePointerId = null;
      onDraggingChange(false);
      pauseAutoScroll(750);
    };

    const onPointerUp = (event) => finishDrag(event);
    const onPointerCancel = (event) => finishDrag(event);
    const onLostPointerCapture = (event) => finishDrag(event);

    const onMouseEnter = () => {
      pausedByHover = true;
    };

    const onMouseLeave = () => {
      pausedByHover = false;
      pauseAutoScroll(160);
    };

    const animate = () => {
      const now = performance.now();

      if (isPointerDown) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (Math.abs(velocityX) > 0.01 && !reduceMotion) {
        position = normalizePosition(position - velocityX * 18);
        velocityX *= 0.92;
      } else {
        velocityX = 0;
      }

      const autoScrollEnabled = !reduceMotion && !pausedByHover && now >= autoResumeAt;
      if (autoScrollEnabled) {
        position = normalizePosition(position + 0.6);
      }

      applyTransform();
      rafId = requestAnimationFrame(animate);
    };

    marquee.addEventListener("pointerdown", onPointerDown);
    marquee.addEventListener("pointermove", onPointerMove);
    marquee.addEventListener("pointerup", onPointerUp);
    marquee.addEventListener("pointercancel", onPointerCancel);
    marquee.addEventListener("lostpointercapture", onLostPointerCapture);
    marquee.addEventListener("mouseenter", onMouseEnter);
    marquee.addEventListener("mouseleave", onMouseLeave);

    applyTransform();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      marquee.removeEventListener("pointerdown", onPointerDown);
      marquee.removeEventListener("pointermove", onPointerMove);
      marquee.removeEventListener("pointerup", onPointerUp);
      marquee.removeEventListener("pointercancel", onPointerCancel);
      marquee.removeEventListener("lostpointercapture", onLostPointerCapture);
      marquee.removeEventListener("mouseenter", onMouseEnter);
      marquee.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [marqueeRef, trackRef, onDraggingChange]);
}
