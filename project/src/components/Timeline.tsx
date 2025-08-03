import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, MapPin, Calendar } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { timelineData } from '../data/timeline';

const Timeline: React.FC = () => {
  const { isIntersecting, elementRef } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '-30px 0px'
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return Briefcase;
      case 'education':
        return GraduationCap;
      case 'achievement':
        return Award;
      default:
        return Briefcase;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-primary-500 text-white';
      case 'education':
        return 'bg-secondary-500 text-white';
      case 'achievement':
        return 'bg-accent-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="timeline" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={elementRef}
          initial={{ opacity: 1, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Professional Journey
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 transition-colors duration-300"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            A timeline of my professional growth, educational milestones, and key achievements
            in data analysis and web development.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = getIcon(item.type);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, x: isEven ? -50 : 50 }}
                  animate={isIntersecting ? { opacity: 1, x: 0 } : { opacity: 1, x: isEven ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
                  className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hardware-accelerated"
                    >
                      {/* Header */}
                      <div className={`flex items-center mb-3 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`${isEven ? 'ml-3' : 'mr-3'}`}>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-semibold transition-colors duration-300">
                            {item.organization}
                          </p>
                        </div>
                        {item.current && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs font-medium transition-colors duration-300">
                            Current
                          </span>
                        )}
                      </div>

                      {/* Location and Date */}
                      <div className={`flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3 transition-colors duration-300 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex items-center ${isEven ? 'ml-4' : 'mr-4'}`}>
                          <MapPin size={16} className="mr-1" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>
                            {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">
                        {item.description}
                      </p>

                      {/* Skills */}
                      {item.skills && (
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs transition-colors duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${getIconColor(item.type)} shadow-lg transition-all duration-300`}
                    >
                      <Icon size={20} />
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;