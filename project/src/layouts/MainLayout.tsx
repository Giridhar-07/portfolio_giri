import React, { Suspense } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SkipToContent from '../components/SkipToContent';
import { Outlet } from 'react-router-dom';

/**
 * MainLayout component
 * Provides a consistent layout wrapper with Navigation, Footer, and a content Outlet.
 * Includes a skip link for accessibility and a Suspense fallback for lazy-loaded pages.
 */
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <SkipToContent />
      <Navigation />
      <main id="content" className="overflow-x-hidden w-full">
        <Suspense fallback={<div className="p-8 text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;