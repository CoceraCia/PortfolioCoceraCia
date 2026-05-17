export default function ExperienceSection() {
  return (
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
  );
}
