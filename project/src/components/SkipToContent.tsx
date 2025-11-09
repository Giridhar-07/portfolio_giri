import React from 'react';

/**
 * SkipToContent component
 * Renders an accessible skip link that allows keyboard users to jump directly to main content.
 */
const SkipToContent: React.FC = () => {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-primary-600 text-white rounded shadow focus:outline-none"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;