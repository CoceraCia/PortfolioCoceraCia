import ProjectPhoneStack from "./ProjectPhoneStack";

export default function ProjectsSection() {
  return (
    <>
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
          <p className="projects-description">Educational Python CLI project built to practice web automation, scraping, asynchronous downloads, image processing, terminal-based configuration, and CBZ file generation.</p>
          <p className="projects-technical">The project includes concurrency-controlled asynchronous workflows, configurable CLI commands, automatic CBZ export, temporary file cleanup, optional grayscale/cropping/resizing image processing, and an extensible scraping architecture based on source adapters and Playwright.</p>
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
          <ProjectPhoneStack
            frontImage="/assets/images/projects/chillmeal/main-screen.png"
            frontAlt="ChillMeal main Android app screen"
            backImage="/assets/images/projects/chillmeal/secondary-screen.png"
            backAlt="ChillMeal secondary Android app screen"
          />
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
          <ProjectPhoneStack
            frontImage="/assets/images/projects/impostor/main-screen.png"
            frontAlt="Impostor main Android app screen"
            backImage="/assets/images/projects/impostor/secondary-screen.png"
            backAlt="Impostor secondary Android app screen"
          />
        </div>
      </aside>
      <aside className="app-tracker-panel scroll-reveal" id="media-tracker" aria-label="Media Tracker App">
        <div className="app-tracker-visual">
          <ProjectPhoneStack
            frontImage="/assets/images/projects/media-tracker/main-screen.png"
            frontAlt="Media Tracker App Android home screen"
            backImage="/assets/images/projects/media-tracker/secondary-screen.png"
            backAlt="Media Tracker App secondary screen"
          />
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
    </>
  );
}
