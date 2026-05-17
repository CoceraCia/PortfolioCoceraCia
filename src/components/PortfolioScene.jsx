import { useCallback, useRef, useState } from "react";
import SidebarNav from "./SidebarNav";
import ResumeDialog from "./ResumeDialog";
import SkillsMarquee from "./SkillsMarquee";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import HeroStage from "./HeroStage";
import useSkillsMarqueeDrag from "../hooks/useSkillsMarqueeDrag";

export default function PortfolioScene() {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [resumeCardOpen, setResumeCardOpen] = useState(false);
  const [isDraggingSkills, setIsDraggingSkills] = useState(false);

  const openResume = useCallback(() => setResumeCardOpen(true), []);
  const closeResume = useCallback(() => setResumeCardOpen(false), []);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const toggleNav = useCallback(() => setNavOpen((open) => !open), []);

  const handleDraggingChange = useCallback((isDragging) => {
    setIsDraggingSkills(isDragging);
  }, []);

  useSkillsMarqueeDrag({ marqueeRef, trackRef, onDraggingChange: handleDraggingChange });

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
      <HeroStage resumeCardOpen={resumeCardOpen} onOpenResume={openResume} />
      <main className="single-page-content" aria-label="Portfolio content">
        <ProjectsSection />
        <SkillsMarquee isDragging={isDraggingSkills} marqueeRef={marqueeRef} trackRef={trackRef} />
        <ExperienceSection />
      </main>

      <button className={`hamburger ${navOpen ? "hamburger-open" : ""}`} type="button" aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={navOpen} aria-controls="portfolio-sidebar" onClick={toggleNav}>
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </button>

      <aside className={`sidebar-overlay ${navOpen ? "sidebar-overlay-visible" : ""}`} onClick={closeNav} />

      <SidebarNav
        navOpen={navOpen}
        onClose={closeNav}
        scrollToStep={scrollToStep}
        scrollToPanel={scrollToPanel}
        onOpenResume={openResume}
      />

      <ResumeDialog open={resumeCardOpen} onClose={closeResume} />
    </>
  );
}
