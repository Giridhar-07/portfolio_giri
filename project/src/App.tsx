import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
// Import test function for EmailJS
import { testEmailJS } from './utils/emailTest';

// Make test function available in development environment
if (import.meta.env.DEV) {
  window.testEmailJS = testEmailJS;
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
        <Navigation />
        <main className="overflow-x-hidden w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;