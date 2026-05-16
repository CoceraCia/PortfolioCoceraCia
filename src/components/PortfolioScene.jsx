import { useRef, useEffect, useState } from "react";

export default function PortfolioScene() {
  const trackRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [resumeCardOpen, setResumeCardOpen] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    let rafId;

    function animate() {
      position -= 0.6;

      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }

      track.style.transform = `translateX(${position}px)`;
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, []);

  function scrollToStep(threshold) {
    const scene = document.querySelector(".scene");
    if (!scene) return;
    const scrollable = scene.offsetHeight - window.innerHeight;
    if (scrollable <= 0) {
      window.scrollTo({ top: window.innerHeight * 5, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: scrollable * threshold, behavior: "smooth" });
  }

  function scrollToPanel(el) {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <>
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
          <p className="portfolio-role">Mobile &amp; Backend Developer | AI Agents Developer.</p>
          <p className="portfolio-intro">I am a cross-platform developer with experience in Kotlin, Swift, Python, Java, backend systems, automations, and AI agents. I currently work at Glofera, building conversational AI solutions for WhatsApp and voice.</p>
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
          <p className="about-kicker">Next</p>
          <h2 className="about-title">About Me</h2>
          <p className="about-story">I&apos;m 21, from Barcelona, and since I discovered programming, I&apos;ve been obsessed with building things. I started with systems computing through SMIX, continued with DAM to specialize in cross-platform development, and I currently work at Glofera creating AI agents for WhatsApp and voice.</p>
          <p className="about-story about-story-secondary">I enjoy building useful tools, automating processes, designing mobile experiences, and exploring how AI can become a real product.</p>
          <p className="about-values">Creativity. Genuine passion for programming. Fast learning. Future-focused interest in AI and Big Data. Product mindset, not just a code mindset.</p>
          <div className="about-actions">
            <button className="portfolio-button portfolio-button-primary about-resume-button" type="button" aria-haspopup="dialog" aria-expanded={resumeCardOpen} onClick={() => setResumeCardOpen(true)}>
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
      <main className="single-page-content" aria-label="Portfolio content">
        <aside className="sanotes-panel scroll-reveal" id="sanotes" aria-label="Sanotes">
          <div className="sanotes-content">
            <p className="projects-kicker">iOS &amp; Firebase</p>
            <h2 className="projects-title">Sanotes</h2>
            <p className="projects-type">Swift · Firebase · Python Cloud Functions</p>
            <p className="sanotes-description">An iOS app for creating and sharing personalised lists of appreciation with your loved ones. Each item can include a photo, and lists are shared securely via unique generated IDs — no accounts needed.</p>
            <p className="sanotes-technical">Built with an MVVM architecture in Swift/SwiftUI, backed by Firebase Cloud Functions written in Python. The backend handles secure note claiming, multi-threaded image uploads, device‑based rate limiting, and automatic temporary storage cleanup.</p>
            <div className="sanotes-features">
              <span className="project-tag">Swift / SwiftUI</span>
              <span className="project-tag">Firebase</span>
              <span className="project-tag">Cloud Functions</span>
              <span className="project-tag">Python backend</span>
              <span className="project-tag">MVVM architecture</span>
              <span className="project-tag">Image processing</span>
              <span className="project-tag">Secure sharing</span>
              <span className="project-tag">Rate limiting</span>
            </div>
            <a className="project-button" href="https://github.com/CoceraCia/Sanotes" target="_blank" rel="noreferrer">
              <img className="project-button-icon" src="/assets/icons/social/github.svg" alt="" />
              <span>View on GitHub</span>
            </a>
          </div>
          <div className="sanotes-visual">
            <div className="sanotes-phone-stack">
              <div className="sanotes-iphone sanotes-iphone-back">
                <div className="sanotes-screen">
                  <img className="sanotes-img" src="/assets/images/projects/sanotes/secondary-screen.png" alt="Sanotes secondary app screen" />
                </div>
                <div className="sanotes-shadow"></div>
              </div>
              <div className="sanotes-iphone sanotes-iphone-front">
                <div className="sanotes-screen">
                  <img className="sanotes-img" src="/assets/images/projects/sanotes/main-screen.png" alt="Sanotes main app screen" />
                </div>
                <div className="sanotes-shadow"></div>
              </div>
            </div>
          </div>
        </aside>
        <aside className="projects-panel scroll-reveal" id="kizamu" aria-label="Selected projects">
          <div className="projects-content">
            <p className="projects-kicker">Featured Project</p>
            <h2 className="projects-title">KizamuManga</h2>
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
              <img className="project-button-icon" src="/assets/icons/social/github.svg" alt="" />
              <span>View on GitHub</span>
            </a>
          </div>
          <div className="projects-visual" aria-hidden="true">
            <img className="projects-manga-panel" src="/assets/images/projects/kizamu/manga-panel.png" alt="" />
            <div className="projects-terminal-shell">
              <div className="terminal-controls">
                <span className="terminal-dots">
                  <span className="terminal-dot terminal-dot-red" aria-hidden="true"></span>
                  <span className="terminal-dot terminal-dot-yellow"><img className="terminal-dot-icon" src="/assets/icons/terminal/window-minimize.svg" alt="" /></span>
                  <span className="terminal-dot terminal-dot-green"><img className="terminal-dot-icon" src="/assets/icons/terminal/window-maximize.svg" alt="" /></span>
                </span>
              </div>
              <pre className="terminal-content"><code id="projectsTerminalCode"></code><span className="terminal-cursor" aria-hidden="true"></span></pre>
            </div>
          </div>
        </aside>
        <aside className="chillmeal-panel scroll-reveal" id="chillmeal" aria-label="ChillMeal">
          <div className="chillmeal-content">
            <p className="projects-kicker">Android App</p>
            <h2 className="projects-title">ChillMeal</h2>
            <p className="projects-type">Kotlin · Jetpack Compose · MVVM</p>
            <p className="chillmeal-description">A recipe recommendation app for Android built with Kotlin and Jetpack Compose. Uses simplified MVVM architecture with clean layer separation, reusable components, and unidirectional data flow.</p>
            <p className="chillmeal-technical">The project follows a data/model/ui layer structure with component-based UI composition, declarative navigation, and collaborative Git workflow through issues, branches, and pull requests.</p>
            <div className="chillmeal-features">
              <span className="project-tag">Kotlin</span>
              <span className="project-tag">Jetpack Compose</span>
              <span className="project-tag">MVVM</span>
              <span className="project-tag">Clean Architecture</span>
              <span className="project-tag">UI Components</span>
              <span className="project-tag">Unidirectional Data Flow</span>
              <span className="project-tag">Git Collaborative Workflow</span>
            </div>
            <a className="project-button" href="https://github.com/CoceraCia/ChillMeal" target="_blank" rel="noreferrer">
              <img className="project-button-icon" src="/assets/icons/social/github.svg" alt="" />
              <span>View on GitHub</span>
            </a>
          </div>
          <div className="chillmeal-visual">
            <div className="chillmeal-phone-stack">
              <div className="chillmeal-img-wrap chillmeal-img-wrap-back">
                <img className="chillmeal-img" src="/assets/images/projects/chillmeal/secondary-screen.png" alt="ChillMeal secondary Android app screen" />
              </div>
              <div className="chillmeal-img-wrap chillmeal-img-wrap-front">
                <img className="chillmeal-img" src="/assets/images/projects/chillmeal/main-screen.png" alt="ChillMeal main Android app screen" />
              </div>
            </div>
          </div>
        </aside>
        <aside className="weatherapp-panel scroll-reveal" id="impostor" aria-label="Impostor">
          <div className="weatherapp-content">
            <p className="projects-kicker">Android App</p>
            <h2 className="projects-title">Impostor</h2>
            <p className="projects-type">Kotlin · Jetpack Compose · First Compose Project</p>
            <p className="weatherapp-description">A small Android game inspired by social deduction mechanics, built as my first project using Jetpack Compose. It was an early experiment to understand declarative UI, screen state, and interactive mobile flows in Kotlin.</p>
            <p className="weatherapp-technical">The project focuses on Compose fundamentals: composable screens, state-driven UI, simple navigation between game steps, and a clean Kotlin structure. It marks the point where I started moving from traditional Android layouts into modern Compose-based development.</p>
            <div className="weatherapp-features">
              <span className="project-tag">Kotlin</span>
              <span className="project-tag">Jetpack Compose</span>
              <span className="project-tag">First Compose project</span>
              <span className="project-tag">Android UI</span>
              <span className="project-tag">Game flow</span>
              <span className="project-tag">State-driven screens</span>
              <span className="project-tag">Declarative UI</span>
            </div>
            <a className="project-button" href="https://github.com/CoceraCia/Impostor" target="_blank" rel="noreferrer">
              <img className="project-button-icon" src="/assets/icons/social/github.svg" alt="" />
              <span>View on GitHub</span>
            </a>
          </div>
          <div className="weatherapp-visual">
            <div className="weatherapp-phone-stack">
              <div className="weatherapp-img-wrap weatherapp-img-wrap-back">
                <img className="weatherapp-img" src="/assets/images/projects/impostor/secondary-screen.png" alt="Impostor secondary Android app screen" />
              </div>
              <div className="weatherapp-img-wrap weatherapp-img-wrap-front">
                <img className="weatherapp-img" src="/assets/images/projects/impostor/main-screen.png" alt="Impostor main Android app screen" />
              </div>
            </div>
          </div>
        </aside>
        <aside className="app-tracker-panel scroll-reveal" id="media-tracker" aria-label="Media Tracker App">
          <div className="app-tracker-visual">
            <div className="weatherapp-phone-stack">
              <div className="weatherapp-img-wrap weatherapp-img-wrap-back">
                <img className="weatherapp-img" src="/assets/images/projects/media-tracker/secondary-screen.png" alt="Media Tracker App secondary screen" />
              </div>
              <div className="weatherapp-img-wrap weatherapp-img-wrap-front">
                <img className="weatherapp-img" src="/assets/images/projects/media-tracker/main-screen.png" alt="Media Tracker App Android home screen" />
              </div>
            </div>
          </div>
          <div className="app-tracker-content">
            <p className="projects-kicker">Current Project</p>
            <h2 className="projects-title">Media Tracker App</h2>
            <p className="projects-type app-tracker-type">Kotlin Multiplatform · GraphQL API · OAuth · Stremio Addon Bridge</p>
            <p className="app-tracker-description">A real app currently in development, built to combine AniList and TrackTech into one unified catalog and tracking experience. The goal is to give users a more flexible place to organize what they want to watch, follow, and manage across different content sources.</p>
            <div className="app-tracker-highlights" aria-label="Media Tracker App highlights">
              <p>Built with Kotlin Multiplatform so the Android foundation can evolve toward iPhone support later.</p>
              <p>Uses APIs and authentication to connect tracking data, catalog discovery, and user-specific state.</p>
              <p>Designed to become compatible with Stremio addons, eventually acting as a bridge for community-created extensions.</p>
            </div>
            <div className="app-tracker-features">
              <span className="project-tag">Kotlin Multiplatform</span>
              <span className="project-tag">AniList + TrackTech unified</span>
              <span className="project-tag">APIs</span>
              <span className="project-tag">Authentication</span>
              <span className="project-tag">Stremio Addon Support</span>
              <span className="project-tag">Android in progress</span>
              <span className="project-tag">iPhone planned</span>
            </div>
            <p className="app-tracker-status"><span className="app-tracker-status-dot"></span> The Android version is being finalized now. The iPhone version has not been developed yet, but the project is being built with long-term ambition and care.</p>
          </div>
        </aside>
        <aside className="remotelog-panel scroll-reveal" id="remotelog" aria-label="Remote Log Server">
          <div className="remotelog-content">
            <p className="projects-kicker">Java Server</p>
            <h2 className="projects-title">Remote Log Server</h2>
            <p className="projects-type">Java · Sockets · Multithreading</p>
            <p className="remotelog-description">A remote logging server built with Java using TCP/IP sockets. Accepts concurrent client connections, validates log levels, and persists synchronized records to a file.</p>
            <p className="remotelog-technical">Implements a custom message protocol over TCP, thread-safe file I/O with explicit locking, and a multi-threaded client handler model. Demonstrates low-level networking, concurrency control, and synchronization primitives.</p>
            <div className="remotelog-features">
              <span className="project-tag">Java</span>
              <span className="project-tag">TCP/IP Sockets</span>
              <span className="project-tag">Multithreading</span>
              <span className="project-tag">Synchronization</span>
              <span className="project-tag">File I/O</span>
              <span className="project-tag">Client-Server</span>
              <span className="project-tag">Custom Protocol</span>
            </div>
            <a className="project-button" href="https://github.com/CoceraCia/Remote-Log-Server" target="_blank" rel="noreferrer">
              <img className="project-button-icon" src="/assets/icons/social/github.svg" alt="" />
              <span>View on GitHub</span>
            </a>
          </div>
          <div className="remotelog-visual">
            <div className="projects-terminal-shell remotelog-terminal-shell">
              <div className="terminal-controls">
                <span className="terminal-dots">
                  <span className="terminal-dot terminal-dot-red" aria-hidden="true"></span>
                  <span className="terminal-dot terminal-dot-yellow"><img className="terminal-dot-icon" src="/assets/icons/terminal/window-minimize.svg" alt="" /></span>
                  <span className="terminal-dot terminal-dot-green"><img className="terminal-dot-icon" src="/assets/icons/terminal/window-maximize.svg" alt="" /></span>
                </span>
              </div>
              <pre className="terminal-content remotelog-terminal-content"><code id="remoteLogTerminalCode"></code><span className="terminal-cursor" aria-hidden="true"></span></pre>
            </div>
          </div>
        </aside>
        <section className="skills-section scroll-reveal" id="skills" aria-label="Skills">
          <p className="skills-kicker">Technical Range</p>
          <h2 className="skills-title">Skills</h2>
          <div className="skills-marquee">
            <div className="skills-marquee-track" ref={trackRef}>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/java.svg" alt="" /><span className="skill-item-label">Java</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/python.svg" alt="" /><span className="skill-item-label">Python</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/fastapi.svg" alt="" /><span className="skill-item-label">FastAPI</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/rest-api.svg" alt="" /><span className="skill-item-label">REST APIs</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/graphql.svg" alt="" /><span className="skill-item-label">GraphQL</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/oop-mvvm.svg" alt="" /><span className="skill-item-label">OOP</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/kotlin.svg" alt="" /><span className="skill-item-label">Kotlin</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/android-studio.svg" alt="" /><span className="skill-item-label">Android Studio</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/swift.svg" alt="" /><span className="skill-item-label">Swift</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/jetpack-compose.svg" alt="" /><span className="skill-item-label">Jetpack Compose</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/sqlite.svg" alt="" /><span className="skill-item-label">SQLite</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/oop-mvvm.svg" alt="" /><span className="skill-item-label">MVVM</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/mysql.svg" alt="" /><span className="skill-item-label">MySQL</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/mariadb.svg" alt="" /><span className="skill-item-label">MariaDB</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/mongodb.svg" alt="" /><span className="skill-item-label">MongoDB</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/firebase.svg" alt="" /><span className="skill-item-label">Firebase</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/git.svg" alt="" /><span className="skill-item-label">Git</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/github.svg" alt="" /><span className="skill-item-label">GitHub</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/netbeans.svg" alt="" /><span className="skill-item-label">NetBeans</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/vs-code.svg" alt="" /><span className="skill-item-label">VS Code</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/figma.svg" alt="" /><span className="skill-item-label">Figma</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/canva.svg" alt="" /><span className="skill-item-label">Canva</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/gimp.svg" alt="" /><span className="skill-item-label">GIMP</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/cli-tools.svg" alt="" /><span className="skill-item-label">CLI Tools</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/web-scraping.svg" alt="" /><span className="skill-item-label">Web Scraping</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/automation.svg" alt="" /><span className="skill-item-label">Automation</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/client-server.svg" alt="" /><span className="skill-item-label">Client-Server</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/php.svg" alt="" /><span className="skill-item-label">PHP</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/java.svg" alt="" /><span className="skill-item-label">Java</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/python.svg" alt="" /><span className="skill-item-label">Python</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/fastapi.svg" alt="" /><span className="skill-item-label">FastAPI</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/rest-api.svg" alt="" /><span className="skill-item-label">REST APIs</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/graphql.svg" alt="" /><span className="skill-item-label">GraphQL</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/oop-mvvm.svg" alt="" /><span className="skill-item-label">OOP</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/kotlin.svg" alt="" /><span className="skill-item-label">Kotlin</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/android-studio.svg" alt="" /><span className="skill-item-label">Android Studio</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/swift.svg" alt="" /><span className="skill-item-label">Swift</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/jetpack-compose.svg" alt="" /><span className="skill-item-label">Jetpack Compose</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/sqlite.svg" alt="" /><span className="skill-item-label">SQLite</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/oop-mvvm.svg" alt="" /><span className="skill-item-label">MVVM</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/mysql.svg" alt="" /><span className="skill-item-label">MySQL</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/mariadb.svg" alt="" /><span className="skill-item-label">MariaDB</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/mongodb.svg" alt="" /><span className="skill-item-label">MongoDB</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/firebase.svg" alt="" /><span className="skill-item-label">Firebase</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/git.svg" alt="" /><span className="skill-item-label">Git</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/github.svg" alt="" /><span className="skill-item-label">GitHub</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/netbeans.svg" alt="" /><span className="skill-item-label">NetBeans</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/vs-code.svg" alt="" /><span className="skill-item-label">VS Code</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/figma.svg" alt="" /><span className="skill-item-label">Figma</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/canva.svg" alt="" /><span className="skill-item-label">Canva</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/gimp.svg" alt="" /><span className="skill-item-label">GIMP</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/cli-tools.svg" alt="" /><span className="skill-item-label">CLI Tools</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/web-scraping.svg" alt="" /><span className="skill-item-label">Web Scraping</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/automation.svg" alt="" /><span className="skill-item-label">Automation</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/client-server.svg" alt="" /><span className="skill-item-label">Client-Server</span></div>
              <div className="skill-item"><img className="skill-icon" src="/assets/icons/skills/php.svg" alt="" /><span className="skill-item-label">PHP</span></div>
            </div>
          </div>
        </section>
        <aside className="experience-panel scroll-reveal" id="experience" aria-label="Experience and Background">
          <p className="experience-kicker">Personal Journey</p>
          <h2 className="experience-title">Experience &amp; Background</h2>
          <p className="experience-intro">A visual look at the real work environment, studies and personal projects shaping how I learn, build and grow as a developer.</p>
          <section className="experience-bento" aria-label="Experience and background segments">
            <article className="experience-segment experience-segment-work">
              <div className="experience-segment-visual" aria-hidden="true">
                <span className="experience-visual-window"></span>
                <span className="experience-visual-node experience-visual-node-one"></span>
                <span className="experience-visual-node experience-visual-node-two"></span>
                <span className="experience-visual-line"></span>
              </div>
              <div className="experience-segment-copy">
                <span className="experience-segment-badge">Currently Working</span>
                <h3 className="experience-segment-title">Work Experience</h3>
                <div className="experience-work-intro">
                  <p className="experience-segment-subtitle">Building real-world solutions through AI, product support and client-facing delivery.</p>
                  <p className="experience-segment-text">This section highlights my progression from early professional roles to my current work at Glofera, where I focus on applied AI, automation and real business workflows.</p>
                  <a className="portfolio-button portfolio-button-primary experience-linkedin-button" href="https://www.linkedin.com/in/miguelcoceracia" target="_blank" rel="noreferrer">
                    View LinkedIn profile
                  </a>
                </div>
                <div className="experience-history" aria-label="Previous experience">
                  <div className="experience-history-entry">
                    <div className="experience-history-head">
                      <div>
                        <h4 className="experience-history-title">Glofera</h4>
                        <p className="experience-history-subtitle">AI Agent Developer</p>
                      </div>
                      <span className="experience-history-date">2025–Present</span>
                    </div>
                    <p className="experience-history-text">Leading the creation and implementation of AI agents, with a strong focus on voice AI and WhatsApp AI agents. My day-to-day work includes understanding agent behavior, applying LLMs effectively, structuring prompts, and turning business needs into practical AI solutions.</p>
                    <p className="experience-history-text">I also work directly with real clients: explaining product behavior, handling incidents, managing requests, and providing clear technical support. This role has strengthened my communication, problem-solving, product understanding, and real-world delivery skills, including CRM and ERP-related workflows.</p>
                    <div className="experience-history-tags" aria-label="Glofera technologies and skills">
                      <span>AI Agents</span>
                      <span>Voice AI</span>
                      <span>WhatsApp AI</span>
                      <span>LLMs</span>
                      <span>Prompt Engineering</span>
                      <span>Client Communication</span>
                      <span>Incident Resolution</span>
                      <span>Technical Support</span>
                      <span>CRM</span>
                      <span>ERP</span>
                      <span>Automation</span>
                      <span>Problem Solving</span>
                    </div>
                  </div>
                  <div className="experience-history-entry">
                    <div className="experience-history-head">
                      <div>
                        <h4 className="experience-history-title">Track Asistencia y Consulting S.L.</h4>
                        <p className="experience-history-subtitle">IT Internship</p>
                      </div>
                      <span className="experience-history-date">2024</span>
                    </div>
                    <p className="experience-history-text">I discovered programming and started learning Python on my own. I built a CLI tool to automate an internal WireGuard VPN process: generating each client configuration, creating the required keys, producing QR codes and keeping the data organized and controlled.</p>
                    <div className="experience-history-tags" aria-label="Internship technologies and concepts">
                      <span>Python</span>
                      <span>WireGuard VPN</span>
                      <span>CLI</span>
                      <span>QR generation</span>
                      <span>Configuration management</span>
                    </div>
                  </div>
                  <div className="experience-history-entry">
                    <div className="experience-history-head">
                      <div>
                        <h4 className="experience-history-title">Loterías y Apuestas del Estado</h4>
                        <p className="experience-history-subtitle">Customer Service</p>
                      </div>
                      <span className="experience-history-date">2024–2025</span>
                    </div>
                    <p className="experience-history-text">A customer-facing role focused on selling lottery tickets, assisting customers and handling daily point-of-sale tasks. It helped me strengthen communication, responsibility, organization and customer service skills.</p>
                    <div className="experience-history-tags" aria-label="Customer service skills">
                      <span>Communication</span>
                      <span>Responsibility</span>
                      <span>Organization</span>
                      <span>Customer Service</span>
                      <span>POS</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="experience-segment experience-segment-education">
              <div className="experience-segment-copy">
                <span className="experience-segment-badge">Academic Path</span>
                <h3 className="experience-segment-title">Education</h3>
                <p className="experience-segment-subtitle">From systems and networks to software development</p>
                <p className="experience-segment-text">My studies show a clear progression from IT infrastructure into software development, combining technical foundations with a more application-focused profile.</p>
                <div className="experience-education-list" aria-label="Academic background">
                  <article className="experience-education-item">
                    <div className="experience-history-head">
                      <div>
                        <h4 className="experience-history-title">Multiplatform Application Development</h4>
                        <p className="experience-history-subtitle">2024–2026</p>
                      </div>
                      <span className="experience-history-date">Finishing soon</span>
                    </div>
                    <p className="experience-history-text">Currently completing this vocational training, focused on programming, databases, application design and multiplatform solutions. It represents my transition from IT systems into a more development-oriented profile.</p>
                    <div className="experience-history-tags" aria-label="Multiplatform development skills">
                      <span>Software development</span>
                      <span>Programming</span>
                      <span>Databases</span>
                      <span>Application design</span>
                      <span>Multiplatform development</span>
                      <span>Problem solving</span>
                    </div>
                  </article>
                  <article className="experience-education-item">
                    <div className="experience-history-head">
                      <div>
                        <h4 className="experience-history-title">Microcomputer Systems and Networks</h4>
                        <p className="experience-history-subtitle">2022–2024</p>
                      </div>
                      <span className="experience-history-date">Completed</span>
                    </div>
                    <p className="experience-history-text">Vocational training focused on computer systems, networks, hardware, operating systems, technical support and basic IT infrastructure.</p>
                    <div className="experience-history-tags" aria-label="Systems and networks skills">
                      <span>Computer systems</span>
                      <span>Networking</span>
                      <span>Hardware</span>
                      <span>Operating systems</span>
                      <span>Technical support</span>
                      <span>IT infrastructure</span>
                    </div>
                  </article>
                </div>
              </div>
            </article>
            <article className="experience-segment experience-segment-background">
              <div className="experience-segment-copy">
                <span className="experience-segment-badge">Learning by Building</span>
                <h3 className="experience-segment-title">Background</h3>
                <p className="experience-segment-subtitle">Personal Journey</p>
                <p className="experience-segment-text">Passionate about learning by building. My background is shaped by personal projects focused on backend development, mobile apps, automation, APIs and useful software tools. I enjoy creating practical solutions, experimenting and improving through real projects.</p>
                <p className="experience-segment-text">Outside formal work and studies, I treat every project as a chance to improve both technical quality and product thinking: cleaner architecture, better usability, and more practical results.</p>
                <div className="experience-background-points" aria-label="Background development focus">
                  <p className="experience-background-heading">How I approach projects</p>
                  <ul className="experience-background-list">
                    <li><span>Builder mindset:</span> turn ideas into working tools quickly, then iterate.</li>
                    <li><span>Product thinking:</span> prioritize usefulness, clarity and real outcomes.</li>
                    <li><span>Continuous growth:</span> learn through experimentation, feedback and consistency.</li>
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </aside>
      </main>

      <label className={`hamburger ${navOpen ? "hamburger-open" : ""}`}>
        <input type="checkbox" checked={navOpen} onChange={() => setNavOpen(!navOpen)} />
        <svg viewBox="0 0 32 32">
          <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>

      <aside className={`sidebar-overlay ${navOpen ? "sidebar-overlay-visible" : ""}`} onClick={() => setNavOpen(false)} />

        <nav className={`sidebar ${navOpen ? "sidebar-open" : ""}`}>
          <ul className="sidebar-links">
            <li><a className="sidebar-link" href="#hero" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToStep(0.68); }}>Hero</a></li>
            <li><a className="sidebar-link" href="#about" onClick={(e) => { e.preventDefault(); scrollToStep(0.74); setNavOpen(false); }}>About</a></li>
            <li className="sidebar-group-label">Projects</li>
            <li><a className="sidebar-link sidebar-link-sub" href="#sanotes" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('sanotes')); }}>Sanotes</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="#kizamu" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('kizamu')); }}>KizamuManga</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="#chillmeal" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('chillmeal')); }}>ChillMeal</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="#impostor" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('impostor')); }}>Impostor</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="#remotelog" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('remotelog')); }}>Remote Log</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="#media-tracker" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('media-tracker')); }}>Media Tracker</a></li>
            <li><a className="sidebar-link" href="#skills" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('skills')); }}>Skills</a></li>
            <li><a className="sidebar-link" href="#experience" onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToPanel(document.getElementById('experience')); }}>Experience</a></li>
            <li className="sidebar-group-label">Socials</li>
            <li><a className="sidebar-link sidebar-link-sub" href="https://www.linkedin.com/in/miguelcoceracia" target="_blank" rel="noreferrer" onClick={() => setNavOpen(false)}>LinkedIn</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="https://github.com/CoceraCia" target="_blank" rel="noreferrer" onClick={() => setNavOpen(false)}>GitHub</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="mailto:coceraciamiguel@gmail.com" onClick={() => setNavOpen(false)}>Mail</a></li>
            <li><a className="sidebar-link sidebar-link-sub" href="#resume" onClick={(e) => { e.preventDefault(); setNavOpen(false); setResumeCardOpen(true); }}>Download Resume</a></li>
          </ul>
        </nav>

      <aside className={`resume-overlay ${resumeCardOpen ? "resume-overlay-visible" : ""}`} onClick={() => setResumeCardOpen(false)} />
      <aside className={`resume-card ${resumeCardOpen ? "resume-card-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!resumeCardOpen} aria-labelledby="resume-card-heading">
        <button className="resume-card-close" type="button" aria-label="Close resume language options" onClick={() => setResumeCardOpen(false)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="resume-card-heading" id="resume-card-heading">Choose Language</h3>
        <div className="resume-card-options">
          <a className="resume-card-option" href="/assets/resume/CV_MiguelCoceraCia_EN.pdf" download onClick={() => setResumeCardOpen(false)}>
            <span className="resume-card-lang">English</span>
            <span className="resume-card-desc">Download resume in English</span>
          </a>
          <a className="resume-card-option" href="/assets/resume/CV_MiguelCoceraCia_ES.pdf" download onClick={() => setResumeCardOpen(false)}>
            <span className="resume-card-lang">Español</span>
            <span className="resume-card-desc">Descargar currículum en español</span>
          </a>
        </div>
      </aside>
    </>
  );
}
