import { useEffect, useRef } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export default function ResumeDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement;

    const focusCloseButton = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(dialogRef.current?.querySelectorAll(focusableSelector) || [])
        .filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusCloseButton);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <>
      <aside className={`resume-overlay ${open ? "resume-overlay-visible" : ""}`} onClick={onClose} />
      <aside className={`resume-card ${open ? "resume-card-open" : ""}`} ref={dialogRef} role="dialog" aria-modal="true" aria-hidden={!open} aria-labelledby="resume-card-heading" inert={open ? undefined : ""}>
        <button className="resume-card-close" type="button" aria-label="Close resume language options" onClick={onClose} ref={closeButtonRef}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="resume-card-heading" id="resume-card-heading">Choose Language</h3>
        <div className="resume-card-options">
          <a className="resume-card-option" href="/assets/resume/CV_MiguelCoceraCia_EN.pdf" download onClick={onClose}>
            <span className="resume-card-lang">English</span>
            <span className="resume-card-desc">Download resume in English</span>
          </a>
          <a className="resume-card-option" href="/assets/resume/CV_MiguelCoceraCia_ES.pdf" download onClick={onClose}>
            <span className="resume-card-lang">Español</span>
            <span className="resume-card-desc">Descargar currículum en español</span>
          </a>
        </div>
      </aside>
    </>
  );
}
