const projectLinks = [
  { id: "sanotes", label: "Sanotes" },
  { id: "kizamu", label: "KizamuManga" },
  { id: "chillmeal", label: "ChillMeal" },
  { id: "impostor", label: "Impostor" },
  { id: "remotelog", label: "Remote Log" },
  { id: "media-tracker", label: "Media Tracker" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/miguelcoceracia", label: "LinkedIn" },
  { href: "https://github.com/CoceraCia", label: "GitHub" },
  { href: "mailto:coceraciamiguel@gmail.com", label: "Mail" },
];

export default function SidebarNav({
  navOpen,
  onClose,
  scrollToStep,
  scrollToPanel,
  onOpenResume,
}) {
  return (
    <nav className={`sidebar ${navOpen ? "sidebar-open" : ""}`}>
      <ul className="sidebar-links">
        <li><a className="sidebar-link" href="#hero" onClick={(event) => { event.preventDefault(); onClose(); scrollToStep(0.68); }}>Hero</a></li>
        <li><a className="sidebar-link" href="#about" onClick={(event) => { event.preventDefault(); onClose(); scrollToStep(0.74); }}>About</a></li>

        <li className="sidebar-group-label">Projects</li>
        {projectLinks.map((item) => (
          <li key={item.id}>
            <a
              className="sidebar-link sidebar-link-sub"
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                onClose();
                scrollToPanel(document.getElementById(item.id));
              }}
            >
              {item.label}
            </a>
          </li>
        ))}

        <li><a className="sidebar-link" href="#skills" onClick={(event) => { event.preventDefault(); onClose(); scrollToPanel(document.getElementById("skills")); }}>Skills</a></li>
        <li><a className="sidebar-link" href="#experience" onClick={(event) => { event.preventDefault(); onClose(); scrollToPanel(document.getElementById("experience")); }}>Experience</a></li>

        <li className="sidebar-group-label">Socials</li>
        {socialLinks.map((item) => (
          <li key={item.label}>
            <a className="sidebar-link sidebar-link-sub" href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} onClick={onClose}>
              {item.label}
            </a>
          </li>
        ))}

        <li>
          <a
            className="sidebar-link sidebar-link-sub"
            href="#resume"
            onClick={(event) => {
              event.preventDefault();
              onClose();
              onOpenResume();
            }}
          >
            Download Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
