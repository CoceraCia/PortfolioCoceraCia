# Miguel Cocera Cia Portfolio

Personal portfolio website built to present my profile, projects, technical skills, and professional background through a polished interactive experience inspired by iOS motion and glass-style UI.

**Live site:** [coceracia.dev](https://www.coceracia.dev/)  
**Repository:** [github.com/CoceraCia/PortfolioCoceraCia](https://github.com/CoceraCia/PortfolioCoceraCia)

## Overview

This portfolio is a single-page React application focused on visual storytelling. It combines a custom animated iPhone scene, scroll-driven transitions, project showcase sections, draggable skill interactions, resume download options, and responsive layouts.

The goal of this project is not only to display information, but to demonstrate care for UI details, interaction design, accessibility, and frontend structure.

## Highlights

- Interactive iPhone-inspired hero scene with scroll-based state changes.
- Custom liquid glass SVG filter and polished visual effects.
- Project sections for mobile apps, backend tools, automation projects, and server-side work.
- Draggable skills marquee with reduced-motion support.
- Accessible resume dialog with keyboard handling, focus management, and Escape-to-close behavior.
- Modular React components with separated interaction controllers.
- Cloudflare-ready deployment setup using Wrangler.

## Tech Stack

- **React 18**
- **Vite**
- **JavaScript / JSX**
- **CSS3**
- **Cloudflare Wrangler**
- **Cloudflare Vite plugin**

## Featured Sections

### Hero

An animated iPhone scene introduces the portfolio with interactive controls, dynamic status feedback, dock links, lock screen behavior, and scroll-triggered transitions.

### Projects

The portfolio includes selected projects such as:

- **Sanotes** — iOS app built with Swift, SwiftUI, Firebase, and Python Cloud Functions.
- **KizamuManga** — Python CLI project focused on scraping, automation, async workflows, image processing, and CBZ export.
- **ChillMeal** — Android recipe app built with Kotlin, Jetpack Compose, and MVVM principles.
- **Impostor** — Android game and first Jetpack Compose project.
- **Media Tracker App** — Kotlin Multiplatform project in development with API integrations and authentication.
- **Remote Log Server** — Java TCP socket server with multithreading and synchronized file persistence.

### Skills

A horizontal interactive marquee showcases technologies and tools across mobile development, backend development, databases, APIs, automation, and design.

### Experience

A visual bento-style section presenting work experience, education, and project-building philosophy.

## Project Structure

```text
.
├── public/
│   └── assets/              # Icons, images, wallpapers and resume files
├── src/
│   ├── components/          # React UI components
│   ├── data/                # Static portfolio data
│   ├── hooks/               # Custom React hooks
│   ├── scripts/             # Interaction controllers and DOM-based effects
│   ├── styles/              # Main stylesheet
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── wrangler.jsonc
```

## Getting Started

### Requirements

- Node.js 22 or newer recommended
- npm

### Installation

```bash
git clone https://github.com/CoceraCia/PortfolioCoceraCia.git
cd PortfolioCoceraCia
npm install
```

### Development

```bash
npm run dev
```

The app will run locally using Vite.

### Production Build

```bash
npm run build
```

### Preview with Cloudflare Wrangler

```bash
npm run preview
```

### Deploy

```bash
npm run deploy
```

## Design and Development Notes

The application uses React for UI composition and separates the more complex imperative interactions into controller-style modules. This keeps the main components focused on structure while allowing scroll animations, terminal playback, phone controls, notifications, and other effects to be managed independently with explicit cleanup.

The project also includes accessibility-focused details such as semantic buttons, ARIA labels, keyboard handling for the resume dialog, and support for users who prefer reduced motion.

## Future Improvements

- Add ESLint and Prettier configuration.
- Split the main stylesheet into smaller feature-based files.
- Add automated checks for build and linting through GitHub Actions.
- Add Open Graph preview metadata for better link sharing.
- Continue refining mobile performance and animation behavior.

## Contact

- **Website:** [coceracia.dev](https://www.coceracia.dev/)
- **GitHub:** [@CoceraCia](https://github.com/CoceraCia)
- **LinkedIn:** [Miguel Cocera Cia](https://www.linkedin.com/in/miguelcoceracia)
- **Email:** [coceraciamiguel@gmail.com](mailto:coceraciamiguel@gmail.com)
