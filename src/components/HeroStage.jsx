export default function HeroStage({ resumeCardOpen, onOpenResume }) {
  return (
    <section className="scene" id="hero">
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
                  <img className="notification-app-logo-icon" src="/assets/icons/app/happy-face.svg" alt="" />
                </span>
                <span className="notification-content">
                  <span className="notification-title">Hi! Play with me!</span>
                  <span className="notification-body">For a better experience use a browser like Chrome.</span>
                </span>
              </div>
              <div className="liquid-glass-bar" aria-hidden="true">
                <a className="dock-app dock-linkedin" href="https://www.linkedin.com/in/miguelcoceracia" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  <img className="dock-app-icon" src="/assets/icons/social/linkedin.svg" alt="" />
                </a>
                <a className="dock-app dock-github" href="https://github.com/CoceraCia" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <img className="dock-app-icon" src="/assets/icons/social/github.svg" alt="" />
                </a>
                <span className="dock-app dock-appstore">
                  <img className="dock-app-icon" src="/assets/icons/app/app-store.svg" alt="" />
                </span>
                <a className="dock-app dock-mail" href="mailto:coceraciamiguel@gmail.com" aria-label="Send email">
                  <img className="dock-app-icon" src="/assets/icons/social/mail.svg" alt="" />
                </a>
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
                  <img className="lock-action-icon lantern-icon" src="/assets/icons/device/flashlight.svg" alt="" />
                </div>
                <div className="lock-action-btn">
                  <img className="lock-action-icon camera-icon" src="/assets/icons/device/camera.svg" alt="" />
                </div>
              </div>
              <div className="unlock-indicator" aria-hidden="true"></div>
            </div>
            <div className="power-overlay"></div>
            <div className="status-bar" aria-hidden="true">
              <div className="status-left">CoceraCia</div>
              <div className="status-right">
                <img className="status-icon signal-icon" src="/assets/icons/device/signal.svg" alt="" />
                <img className="status-icon" src="/assets/icons/device/wifi.svg" alt="" />
                <div className="battery-wrap">
                  <img className="status-icon battery-icon" src="/assets/icons/device/battery-empty.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="island-feedback-pill" id="islandFeedbackPill" aria-hidden="true">
              <span className="island-feedback-side island-feedback-left">
                <img className="island-feedback-icon" id="islandFeedbackIcon" src="/assets/icons/device/bell-muted.svg" alt="" />
              </span>
              <span className="island-feedback-center" id="islandFeedbackCenter" aria-hidden="true"></span>
              <span className="island-feedback-side island-feedback-right">
                <span className="island-feedback-label" id="islandFeedbackLabel">Silent</span>
              </span>
            </div>
            <div className="dynamic-island">
              <div className="island-lock" aria-hidden="true">
                <img className="island-lock-icon lock-closed" src="/assets/icons/device/lock-closed.svg" alt="" />
                <img className="island-lock-icon lock-open" src="/assets/icons/device/lock-open.svg" alt="" />
              </div>
            </div>
            <div className="island-camera" aria-hidden="true"></div>
            <div className="volume-hud" id="volumeHud" aria-hidden="true">
              <div className="volume-hud-row">
                <div className="volume-bar-track">
                  <div className="volume-bar-fill" id="volumeFill"></div>
                </div>
                <img className="volume-glyph" id="volumeGlyph" src="/assets/icons/device/volume-low.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="shadow" aria-hidden="true"></div>
        </main>
        <aside className="portfolio-panel scroll-reveal" aria-label="About me as a developer">
          <h1 className="portfolio-title">Miguel Cocera Cia</h1>
          <p className="portfolio-role">App &amp; Backend Developer | Kotlin, Python, Swift &amp; Java.</p>
          <p className="portfolio-intro">I build practical software across mobile apps, backend systems, APIs, database-driven projects and automation tools, currently focusing most on Kotlin, followed by Python, Swift and Java.</p>
          <div className="portfolio-actions" aria-label="Profile links">
            <a className="portfolio-button portfolio-button-primary" href="https://github.com/CoceraCia" target="_blank" rel="noreferrer">
              <img className="portfolio-button-icon" src="/assets/icons/social/github.svg" alt="" />
              <span>GitHub</span>
            </a>
            <a className="portfolio-button portfolio-button-secondary" href="mailto:coceraciamiguel@gmail.com">
              <img className="portfolio-button-icon" src="/assets/icons/social/mail.svg" alt="" />
              <span>Contact me</span>
            </a>
          </div>
        </aside>
        <aside className="about-panel scroll-reveal" id="about" aria-label="About me">
          <p className="about-kicker">Background</p>
          <h2 className="about-title">About Me</h2>
          <p className="about-story">I&apos;m a developer from Barcelona finishing my Multimedia Application Development studies in about one month, with a strong focus on app development, backend systems, APIs, databases and software architecture.</p>
          <p className="about-story about-story-secondary">My current technical focus is Kotlin first, then Python, Swift and Java, combining mobile app development with server-side logic, data models, automation, frontend basics and user-facing interfaces.</p>
          <p className="about-values">Core focus: Kotlin app development, Python backend work, Swift mobile projects, APIs and databases. Also experienced with Java, PHP, HTML/CSS, Git, GitHub, Android Studio, NetBeans, Figma, Canva and Gimp through personal and academic projects.</p>
          <div className="about-actions">
            <button className="portfolio-button portfolio-button-primary about-resume-button" type="button" aria-haspopup="dialog" aria-expanded={resumeCardOpen} onClick={onOpenResume}>
              Download Resume
            </button>
          </div>
        </aside>
        <aside className="projects-intro-panel scroll-reveal" aria-label="Selected projects introduction">
          <div className="projects-intro-header projects-carousel-header">
            <p className="projects-kicker">Project Space</p>
            <h2 className="projects-title">Selected Projects</h2>
            <p className="projects-carousel-intro">A curated set of mobile apps, backend systems, command-line tools, and experiments</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
