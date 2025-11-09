import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Calendar, Briefcase } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * About
 * Renders the About section with animated content, a profile photo,
 * key details, and a resume download action.
 */
const About: React.FC = () => {
  const { isIntersecting, elementRef } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '-30px 0px'
  });
  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => {
    if (isIntersecting) setHasEntered(true);
  }, [isIntersecting]);

  // No need for image preloading anymore

  /**
   * handleDownloadResume
   * Triggers a download of the resume PDF from the public folder.
   */
  const handleDownloadResume = () => {
    const link = document.createElement('a');

    // Use the exact filename as present in the public directory
    link.href = '/Giridhar Malagi - Resume_.pdf';
    link.href = '/Giridhar_Malagi_data_Resume.pdf';

    link.download = 'Giridhar_Malagi_Resume.pdf';
    link.click();
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={elementRef}
          initial={{ opacity: 0, y: 50 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          {/* Profile Photo */}
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            src="/coporate_headshot.png"
            alt="Profile photo of Giridhar N Malagi"
            className="mx-auto mb-6 w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-md"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto transition-colors duration-300"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            {/* Name and Role */}
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Giridhar N Malagi
              </h3>
              <p className="text-xl md:text-2xl text-primary-600 dark:text-primary-400 font-semibold transition-colors duration-300">
                Electronics & Communication Engineering Graduate
              </p>
            </div>

            <h4 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Passionate About Data & Technology
            </h4>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                I am a passionate Electronics and Communication Engineering Graduate with strong interests in Data Analytics and Full Stack Development. I strive to leverage technology to create impactful solutions.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                A Electronics and Communication Engineering Bachelor's degree with a focus on modern technologies, I enjoy working at the intersection of electronics, data science, and Full Stack development. My goal is to transform complex data into actionable insights while building innovative digital experiences.
              </p>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <motion.div 
                className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <MapPin className="text-primary-600 dark:text-primary-400 transition-colors duration-300 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">India</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="text-primary-600 dark:text-primary-400 transition-colors duration-300 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">2025 Graduate</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2 md:col-span-2"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <Briefcase className="text-primary-600 dark:text-primary-400 transition-colors duration-300 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Open to Opportunities</span>
              </motion.div>
            </div>

            {/* Resume Download */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadResume}
              className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-8 hardware-accelerated"
            >
              <Download size={20} className="mr-2" />
              Download Full Resume
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
