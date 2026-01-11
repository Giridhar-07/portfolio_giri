import React, { lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { testEmailJS } from './utils/emailTest';

// Lazy-loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Expose test helper in development
if (import.meta.env.DEV) {
  window.testEmailJS = testEmailJS;
}

/**
 * App component
 * Wraps the application with ThemeProvider and React Router routes using MainLayout.
 */
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}> 
            <Route index element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;