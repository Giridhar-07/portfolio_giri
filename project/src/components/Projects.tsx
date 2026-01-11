import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter, Star } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const { isIntersecting, elementRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'data' | 'web'>('all');

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const filters = [
    { key: 'all' as const, label: 'All Projects', count: projects.length },
    { key: 'data' as const, label: 'Data Analytics', count: projects.filter(p => p.category === 'data').length },
    { key: 'web' as const, label: 'Web Development', count: projects.filter(p => p.category === 'web').length },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={elementRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 transition-colors duration-300"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            A collection of projects showcasing my expertise in data analysis and Full stack development,
            from machine learning models to full-stack applications.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 hardware-accelerated ${
                activeFilter === filter.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Filter size={18} className="mr-2" />
              {filter.label}
              <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-sm">
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hardware-accelerated"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500 hardware-accelerated"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2 sm:space-x-3">
                      {project.links.demo && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                        >
                          <Eye size={18} className="sm:size-[20px]" />
                        </motion.a>
                      )}
                      {project.links.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                        >
                          <Github size={18} className="sm:size-[20px]" />
                        </motion.a>
                      )}
                      {project.links.caseStudy && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          href={project.links.caseStudy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                        >
                          <ExternalLink size={18} className="sm:size-[20px]" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <div className="flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 bg-accent-500 text-white rounded-full text-xs sm:text-sm font-medium">
                        <Star size={12} className="mr-0.5 sm:mr-1 sm:size-[14px]" />
                        Featured
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium capitalize transition-colors duration-300 ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs font-medium transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs transition-colors duration-300">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-2 sm:space-x-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 p-1"
                      >
                        <Github size={16} className="sm:size-[18px]" />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 p-1"
                      >
                        <ExternalLink size={16} className="sm:size-[18px]" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            href="https://github.com/Giridhar-07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hardware-accelerated"
          >
            <Github size={18} className="mr-1.5 sm:mr-2 sm:size-[20px]" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;