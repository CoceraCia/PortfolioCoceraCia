export default function ProjectPhoneStack({ frontImage, frontAlt, backImage, backAlt }) {
  return (
    <div className="project-phone-stack">
      <div className="project-phone-card project-phone-card-back">
        <img className="project-phone-image" src={backImage} alt={backAlt} />
      </div>
      <div className="project-phone-card project-phone-card-front">
        <img className="project-phone-image" src={frontImage} alt={frontAlt} />
      </div>
    </div>
  );
}
