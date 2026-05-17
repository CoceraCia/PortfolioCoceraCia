import skills from "../data/skills";

export default function SkillsMarquee({ isDragging, marqueeRef, trackRef }) {
  return (
    <section className="skills-section scroll-reveal" id="skills" aria-label="Skills">
      <p className="skills-kicker">Technical Range</p>
      <h2 className="skills-title">Skills</h2>
      <div className={`skills-marquee${isDragging ? " is-dragging" : ""}`} ref={marqueeRef}>
        <div className="skills-marquee-track" ref={trackRef}>
          {[...skills, ...skills].map((skill, index) => (
            <div className="skill-item" key={`${skill.label}-${index}`}>
              <img className="skill-icon" src={skill.icon} alt="" />
              <span className="skill-item-label">{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
