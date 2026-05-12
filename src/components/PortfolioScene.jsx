import { useState } from "react";

export default function PortfolioScene() {
  const experiences = [
    {
      id: "glofera",
      date: "2025 - Present",
      company: "Glofera",
      logo: "/assets/images/Glofera-logo.svg",
      logoAlt: "Glofera logo",
      role: "AI Agents / Backend / Mobile Developer",
      meta: "1 year · Intensive dual training and contract",
      copy: "I work on real-world conversational AI solutions focused on WhatsApp and voice agents, combining product thinking with technical implementation in a production-oriented environment.",
      points: "AI agents for WhatsApp · Voice agents · API integrations · Workflow automation · Backend logic for conversational systems · Business-focused AI solutions",
    },
    {
      id: "track",
      date: "2024 · SMIX Internship",
      company: "Track Asistencia y Consulting SL",
      logo: "/assets/images/track-logo.png",
      logoAlt: "Track Asistencia y Consulting logo",
      role: "IT Technician / Python Automations",
      meta: "Internship period",
      copy: "My first real contact with automation in a company setting, with a strong focus on technical support, incident resolution, and practical Python-based automations.",
      points: "Technical support · Python automations · Incident resolution · Company environment learning · First real contact with automation",
    },
    {
      id: "loterias",
      date: "2023 · 2024-2025",
      company: "Loterias y Apuestas del Estado",
      logo: "/assets/images/loterias-logo.png",
      logoAlt: "Loterias y Apuestas del Estado logo",
      role: "Operations Support",
      meta: "Caramel de la Sort (2023) · Anec Blau (2024-2025)",
      copy: "Professional experience in real operational environments, contributing to daily workflows, customer-facing operations, responsibility, coordination, and service quality while strengthening reliability and execution under real constraints.",
      points: "Operations support · Coordination · Service quality · Customer-facing execution · Reliability under real constraints",
    },
  ];

  const [activeExperienceId, setActiveExperienceId] = useState(experiences[0].id);
  const activeExperience = experiences.find((experience) => experience.id === activeExperienceId) || experiences[0];

  return (
    <section className="scene">
      <div className="stage" id="stage">
        <main className="iphone" aria-label="iPhone 15">
          <span className="rail" aria-hidden="true"></span>
          <button className="phone-button action-button" type="button" aria-label="Boton accion"></button>
          <button className="phone-button volume-up" type="button" aria-label="Subir volumen"></button>
          <button className="phone-button volume-down" type="button" aria-label="Bajar volumen"></button>
          <button className="phone-button power-button" type="button" aria-label="Boton lateral"></button>
          <div className="screen" aria-hidden="true">
            <div className="home-screen" aria-hidden="true">
              <div className="liquid-glass-notification" aria-hidden="true">
                <span className="notification-app-logo">
                  <img className="notification-app-logo-icon" src="/assets/icons/happy-face.svg" alt="" />
                </span>
                <span className="notification-content">
                  <span className="notification-title">Hi! Play with me!</span>
                  <span className="notification-body">For a better experience use a browser like Chrome.</span>
                </span>
              </div>
              <div className="liquid-glass-bar" aria-hidden="true">
                <span className="dock-app dock-linkedin">
                  <img className="dock-app-icon" src="/assets/icons/linkedin.svg" alt="" />
                </span>
                <span className="dock-app dock-github">
                  <img className="dock-app-icon" src="/assets/icons/github.svg" alt="" />
                </span>
                <span className="dock-app dock-appstore">
                  <img className="dock-app-icon" src="/assets/icons/app-store.svg" alt="" />
                </span>
                <span className="dock-app dock-mail">
                  <img className="dock-app-icon" src="/assets/icons/mail.svg" alt="" />
                </span>
              </div>
            </div>
            <div className="lock-screen-panel" aria-hidden="true">
              <div className="wallpaper"></div>
              <div className="lock-clock" aria-hidden="true">
                <p className="lock-date" id="lockDate">Wed 6 May</p>
                <p className="lock-time" id="lockTime">09:41</p>
              </div>
              <div className="lock-actions" aria-hidden="true">
                <div className="lock-action-btn">
                  <img className="lock-action-icon lantern-icon" src="/assets/icons/flashlight.svg" alt="" />
                </div>
                <div className="lock-action-btn">
                  <img className="lock-action-icon camera-icon" src="/assets/icons/camera.svg" alt="" />
                </div>
              </div>
              <div className="unlock-indicator" aria-hidden="true"></div>
            </div>
            <div className="power-overlay"></div>
            <div className="status-bar" aria-hidden="true">
              <div className="status-left">CoceraCia</div>
              <div className="status-right">
                <img className="status-icon signal-icon" src="/assets/icons/signal-custom.svg" alt="" />
                <img className="status-icon" src="/assets/icons/wifi.svg" alt="" />
                <div className="battery-wrap">
                  <img className="status-icon battery-icon" src="/assets/icons/battery-empty.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="island-feedback-pill" id="islandFeedbackPill" aria-hidden="true">
              <span className="island-feedback-side island-feedback-left">
                <img className="island-feedback-icon" id="islandFeedbackIcon" src="/assets/icons/bell-muted.svg" alt="" />
              </span>
              <span className="island-feedback-center" id="islandFeedbackCenter" aria-hidden="true"></span>
              <span className="island-feedback-side island-feedback-right">
                <span className="island-feedback-label" id="islandFeedbackLabel">Silent</span>
              </span>
            </div>
            <div className="dynamic-island">
              <div className="island-lock" aria-hidden="true">
                <img className="island-lock-icon lock-closed" src="/assets/icons/padlock_close.svg" alt="" />
                <img className="island-lock-icon lock-open" src="/assets/icons/padlock_open.svg" alt="" />
              </div>
            </div>
            <div className="island-camera" aria-hidden="true"></div>
            <div className="volume-hud" id="volumeHud" aria-hidden="true">
              <div className="volume-hud-row">
                <div className="volume-bar-track">
                  <div className="volume-bar-fill" id="volumeFill"></div>
                </div>
                <img className="volume-glyph" id="volumeGlyph" src="/assets/icons/volume-low.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="shadow" aria-hidden="true"></div>
        </main>
        <aside className="portfolio-panel" aria-label="About me as a developer">
          <h1 className="portfolio-title">Miguel Cocera Cia</h1>
          <p className="portfolio-role">Mobile &amp; Backend Developer | AI Agents Developer.</p>
          <p className="portfolio-intro">I am a cross-platform developer with experience in Kotlin, Swift, Python, Java, backend systems, automations, and AI agents. I currently work at Glofera, building conversational AI solutions for WhatsApp and voice.</p>
          <div className="portfolio-actions" aria-label="Profile links">
            <a className="portfolio-button portfolio-button-primary" href="https://github.com/CoceraCia" target="_blank" rel="noreferrer">
              <img className="portfolio-button-icon" src="/assets/icons/github.svg" alt="" />
              <span>GitHub</span>
            </a>
            <a className="portfolio-button portfolio-button-secondary" href="mailto:coceraciamiguel@gmail.com">
              <img className="portfolio-button-icon" src="/assets/icons/mail.svg" alt="" />
              <span>Contact me</span>
            </a>
          </div>
        </aside>
        <aside className="about-panel" aria-label="About me">
          <p className="about-kicker">Next</p>
          <h2 className="about-title">About Me</h2>
          <p className="about-story">I&apos;m 21, from Barcelona, and since I discovered programming, I&apos;ve been obsessed with building things. I started with systems computing through SMIX, continued with DAM to specialize in cross-platform development, and I currently work at Glofera creating AI agents for WhatsApp and voice.</p>
          <p className="about-story about-story-secondary">I enjoy building useful tools, automating processes, designing mobile experiences, and exploring how AI can become a real product.</p>
          <p className="about-values">Creativity. Genuine passion for programming. Fast learning. Future-focused interest in AI and Big Data. Product mindset, not just a code mindset.</p>
        </aside>
        <aside className="experience-panel" aria-label="Professional experience">
          <p className="experience-kicker">Journey</p>
          <h2 className="experience-title">Professional Experience</h2>
          <p className="experience-note">For confidentiality reasons, some projects are described in general terms, focusing on my role, technologies, and key learnings.</p>
          <div className="experience-layout">
            <div className="experience-selector" role="tablist" aria-label="Experience timeline selector">
              <div className="experience-path" aria-hidden="true"></div>
              {experiences.map((experience) => {
                const isActive = activeExperience.id === experience.id;

                return (
                  <button
                    key={experience.id}
                    className={`experience-node${isActive ? " is-active" : ""}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="experience-detail"
                    onClick={() => setActiveExperienceId(experience.id)}
                  >
                    <span className="experience-node-dot" aria-hidden="true"></span>
                    <span className="experience-node-date">{experience.date}</span>
                    <span className="experience-node-company">{experience.company}</span>
                  </button>
                );
              })}
            </div>
            <article key={activeExperience.id} id="experience-detail" className="experience-detail-content" role="tabpanel" aria-label={activeExperience.company}>
              <img className="experience-work-logo" src={activeExperience.logo} alt={activeExperience.logoAlt} />
              <p className="experience-role">{activeExperience.role}</p>
              <p className="experience-meta">{activeExperience.meta}</p>
              <p className="experience-copy">{activeExperience.copy}</p>
              <p className="experience-points">{activeExperience.points}</p>
            </article>
          </div>
        </aside>
        <aside className="education-panel" aria-label="Education">
          <p className="education-kicker">Foundation</p>
          <h2 className="education-title">Education</h2>
          <p className="education-copy">My education combines a strong technical foundation in systems, cross-platform development, and a clear evolution toward artificial intelligence and data.</p>
          <div className="education-list" aria-label="Education wallet cards">
            <article className="education-item education-item-systems">
              <div className="education-pass-top">
                <span className="education-pass-badge">SMIX</span>
                <span className="education-pass-status">Systems</span>
              </div>
              <div className="education-pass-body">
                <p className="education-label">CFGM SMIX</p>
                <p className="education-detail">Microcomputer Systems and Networks at <a href="https://stucom.com/" target="_blank" rel="noreferrer">Stucom</a></p>
              </div>
              <div className="education-pass-tags" aria-label="SMIX highlights">
                <span>Networks</span>
                <span>Support</span>
                <span>Hardware</span>
              </div>
            </article>
            <article className="education-item education-item-dev">
              <div className="education-pass-top">
                <span className="education-pass-badge">DAM</span>
                <span className="education-pass-status">Development</span>
              </div>
              <div className="education-pass-body">
                <p className="education-label">CFGS DAM</p>
                <p className="education-detail">Cross-Platform Application Development at <a href="https://stucom.com/" target="_blank" rel="noreferrer">Stucom</a>, with the final year completed online at <a href="https://linkiafp.es/" target="_blank" rel="noreferrer">LinkiaFP</a></p>
              </div>
              <div className="education-pass-tags" aria-label="DAM highlights">
                <span>Mobile</span>
                <span>Backend</span>
                <span>Apps</span>
              </div>
            </article>
            <article className="education-item education-item-language">
              <div className="education-pass-top">
                <span className="education-pass-badge">B2</span>
                <span className="education-pass-status">English</span>
              </div>
              <div className="education-pass-body">
                <p className="education-label">B2 First</p>
                <p className="education-detail">First Certificate in English at <a href="https://janets.es/" target="_blank" rel="noreferrer">Janet&apos;s</a></p>
              </div>
              <div className="education-pass-tags" aria-label="English certificate highlights">
                <span>Communication</span>
                <span>Certificate</span>
              </div>
            </article>
            <article className="education-item education-item-ai">
              <div className="education-pass-top">
                <span className="education-pass-badge">AI</span>
                <span className="education-pass-status">Next</span>
              </div>
              <div className="education-pass-body">
                <p className="education-label">Upcoming</p>
                <p className="education-detail">Master&apos;s Degree in AI and Big Data</p>
              </div>
              <div className="education-pass-tags" aria-label="Upcoming master highlights">
                <span>AI</span>
                <span>Big Data</span>
                <span>Product</span>
              </div>
            </article>
          </div>
        </aside>
        <aside className="projects-panel" aria-label="Selected projects">
          <div className="projects-content">
            <p className="projects-kicker">Featured Project</p>
            <h2 className="projects-title">Selected Projects</h2>
            <h3 className="projects-name">KizamuManga</h3>
            <p className="projects-type">Python CLI · Scraping · Automation</p>
            <p className="projects-description">A command-line tool to search, download, and convert manga chapters into CBZ files from multiple online sources.</p>
            <p className="projects-technical">The project includes asynchronous downloads with concurrency control, automatic CBZ export, temporary file cleanup, image processing, multi-source support, and an extensible scraping architecture using Playwright.</p>
            <div className="projects-tags" aria-label="Project highlights">
              <span className="project-tag">Advanced Python</span>
              <span className="project-tag">Modular architecture</span>
              <span className="project-tag">Scraping</span>
              <span className="project-tag">Automation</span>
              <span className="project-tag">Async / concurrency</span>
              <span className="project-tag">Installable CLI tool</span>
              <span className="project-tag">Technical documentation</span>
              <span className="project-tag">Image processing</span>
              <span className="project-tag">Playwright</span>
              <span className="project-tag">Multi-source support</span>
            </div>
            <a className="project-button" href="https://github.com/CoceraCia/KizamuManga" target="_blank" rel="noreferrer">
              <img className="project-button-icon" src="/assets/icons/github.svg" alt="" />
              <span>View on GitHub</span>
            </a>
          </div>
          <div className="projects-visual" aria-hidden="true">
            <img className="projects-manga-panel" src="/assets/images/manga-panel.png" alt="" />
            <div className="projects-terminal-shell">
              <div className="terminal-controls">
                <span className="terminal-dots">
                  <span className="terminal-dot terminal-dot-red" aria-hidden="true"></span>
                  <span className="terminal-dot terminal-dot-yellow"><img className="terminal-dot-icon" src="/assets/icons/minus-svgrepo-com.svg" alt="" /></span>
                  <span className="terminal-dot terminal-dot-green"><img className="terminal-dot-icon" src="/assets/icons/plus-1512-svgrepo-com.svg" alt="" /></span>
                </span>
              </div>
              <pre className="terminal-content"><code id="projectsTerminalCode"></code><span className="terminal-cursor" aria-hidden="true"></span></pre>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
