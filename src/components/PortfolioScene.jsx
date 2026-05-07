export default function PortfolioScene() {
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
        <aside className="portfolio-panel" aria-label="Sobre mi como desarrollador">
          <h1 className="portfolio-title">Miguel Cocera Cia</h1>
          <p className="portfolio-role">Desarrollador de apps multiplataforma y backend en Python.</p>
          <p className="portfolio-intro">Construyo experiencias moviles fluidas, cuidadas y preparadas para produccion, conectadas a backends robustos y escalables.</p>
          <p className="portfolio-motto">De una idea a una app lista para crecer.</p>
          <div className="portfolio-tags" aria-hidden="true">
            <span>Mobile Apps</span>
            <span>Python Backend</span>
            <span>Product Development</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
