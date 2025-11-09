# Project Overview

This repository contains a modern, responsive portfolio website built with React (TypeScript) and Vite. It showcases sections such as Home, About, Skills, Projects, Certificates, Timeline, and Contact, and includes a theme toggling mechanism (light/dark), smooth animations, and a contact form powered by EmailJS.

## Purpose and Goals
- Present a professional personal portfolio with clear navigation and rich visuals.
- Maintain accessibility and performance standards for a broad audience.
- Provide a scalable architecture that supports future feature additions and page-level growth.

## High-Level Architecture
- Frontend: React + TypeScript running on Vite with Tailwind CSS for styling.
- State: Context for theme (`ThemeContext`) and local component states for UI interactions.
- Animations: Framer Motion with IntersectionObserver-based hooks.
- Data: Static TypeScript modules (`src/data`) providing projects, certificates, timeline, and skills.
- Utilities: EmailJS integration and testing helper functions.
- Build/Deploy: Vite build; Netlify config present; scripts for deployment.

## Key Modules, Classes, and Functions
- `project/src/App.tsx`: Root router configuration defining route-based navigation and lazy-loaded pages.
- `src/contexts/ThemeContext.tsx`:
  - `ThemeProvider`: Manages dark/light mode and persists preference in `localStorage`.
  - `useTheme()`: Hook to access `isDarkMode` and `toggleTheme()`.
- `src/hooks/useIntersectionObserver.ts`: Lightweight hook to detect when a referenced element is in view.
- `src/hooks/useScrollProgress.ts`: Tracks window scroll progress for UI indicators.
- `src/hooks/useScrollFade.ts`: Advanced scroll fade logic with timing and consumption heuristics.
- `src/utils/emailjs.ts`: Initializes EmailJS using environment variables (`VITE_EMAILJS_*`).
- `src/utils/emailTest.ts`: Test helper exposed via `window.testEmailJS` in development.
- `project/src/components/*`:
  - `Navigation`: Top navigation bar with theme toggle and anchor-based links.
  - `Hero`: Landing section with name, role, and primary CTAs.
  - `About`: Bio, resume download, and key details.
  - `Skills`: Lists competencies with animated bars.
  - `Projects`: Filterable, animated grid of projects with links.
  - `Certificates`: Filterable grid of certificates with modal details.
  - `Timeline`: Visual timeline for education/work/achievements.
  - `Contact`: Contact form integrated with EmailJS, social links, copy-to-clipboard helpers.
  - `Footer`: Footer with quick-links, social icons, and scroll-to-top.
- `src/data/*`: Typed arrays exporting content for projects, certificates, timeline, and skills.

## Data Flow and Dependencies
- Theme state flows from `ThemeProvider` and is consumed by `Navigation` and other components via `useTheme()`.
- Intersection-based animations depend on `useIntersectionObserver` and Framer Motion; hooks expose `elementRef` and an `isIntersecting` boolean to control animations.
- EmailJS utilities read environment variables; `Contact` uses `emailjs-com` directly for form submission.
- Visual data is sourced from static modules in `src/data` and iterated by display components.

## Navigation and Layout
- Route-based navigation via `react-router-dom` with distinct pages: `/`, `/about`, `/skills`, `/projects`, `/certificates`, `/timeline`, `/contact`.
- `project/src/layouts/MainLayout.tsx` provides persistent `Navigation`, `Footer`, an accessible `SkipToContent` link, and an `Outlet` wrapped in `Suspense` with a fallback.
- Page components live under `project/src/pages/*` and render feature components from `project/src/components/*`.

## Example Workflows
- Visitor lands on Home, scrolls through sections or navigates via nav; toggles dark mode; downloads resume; explores projects and certificates; submits contact form via EmailJS.
- In development, a tester can run `window.testEmailJS()` from the console to verify EmailJS config.

## Guidelines for Future Feature Additions
- Define a new page under `src/pages/<Feature>Page.tsx` and keep pure UI components under `src/components`.
- Register the route in `App.tsx` (or a dedicated `routes.tsx`) and add a nav item.
- Use `ThemeContext` for theme-aware styling and Tailwind utility classes for spacing and responsive design.
- Ensure accessibility: semantic landmarks, aria attributes, focus states, keyboard interactions.
- Write unit tests (Vitest + Testing Library) for component logic and e2e tests (Playwright) for user flows.
- Prefer lazy-loading for non-critical pages; keep shared layout persistent for UX continuity.

## Performance Considerations
- Code-split pages with `React.lazy`.
- Use IntersectionObserver-based animations to avoid work when off-screen.
- Optimize image usage and ensure hardware-accelerated transforms where appropriate.

## Stack Summary
- React 18 + TypeScript, Vite, Tailwind CSS
- Framer Motion, Lucide React, EmailJS
- React Router DOM
- Vitest + Testing Library (unit/integration)
- Playwright (`@playwright/test`) for cross-browser e2e

## Deployment
- Vite build artifacts ready for static hosting; Netlify configs present.
- Scripts: `dev`, `build`, `preview`, and deployment helpers.