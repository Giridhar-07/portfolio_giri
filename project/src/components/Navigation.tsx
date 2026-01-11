import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();
  const location = useLocation();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };
    
    // Close menu when scrolling
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Skills', to: '/skills' },
    { name: 'Projects', to: '/projects' },
    { name: 'Certificates', to: '/certificates' },
    { name: 'Timeline', to: '/timeline' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-50 transition-colors duration-300"
        style={{ scaleX: scrollProgress }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-primary-600 dark:text-primary-400 transition-colors duration-300"
            >
              GM
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    to={item.to}
                    aria-current={location.pathname === item.to ? 'page' : undefined}
                    className={`text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 font-medium ${location.pathname === item.to ? 'text-primary-600 dark:text-primary-400' : ''}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300"
              >
                {isDarkMode ? <Sun size={18} className="sm:size-[20px]" /> : <Moon size={18} className="sm:size-[20px]" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 mobile-menu-button"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={20} className="sm:size-[24px]" /> : <Menu size={20} className="sm:size-[24px]" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300 mobile-menu-container"
        >
          <div className="px-4 py-2 space-y-0.5 sm:space-y-1">
            {menuItems.map((item) => (
              <motion.div key={item.name} whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                <Link
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navigation;