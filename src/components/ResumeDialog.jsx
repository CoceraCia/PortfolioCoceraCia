export default function ResumeDialog({ open, onClose }) {
  return (
    <>
      <aside className={`resume-overlay ${open ? "resume-overlay-visible" : ""}`} onClick={onClose} />
      <aside className={`resume-card ${open ? "resume-card-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open} aria-labelledby="resume-card-heading">
        <button className="resume-card-close" type="button" aria-label="Close resume language options" onClick={onClose}>
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
