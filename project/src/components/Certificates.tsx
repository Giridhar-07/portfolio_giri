import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Filter, X, Award } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { certificates } from '../data/certificates';

const Certificates: React.FC = () => {
  const { isIntersecting, elementRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'data' | 'web' | 'other'>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);

  const filteredCertificates = certificates.filter(certificate => 
    activeFilter === 'all' || certificate.category === activeFilter
  );

  const filters = [
    { key: 'all' as const, label: 'All Certificates', count: certificates.length },
    { key: 'data' as const, label: 'Data Science', count: certificates.filter(c => c.category === 'data').length },
    { key: 'web' as const, label: 'Web Development', count: certificates.filter(c => c.category === 'web').length },
    { key: 'other' as const, label: 'Other', count: certificates.filter(c => c.category === 'other').length },
  ];

  const openCertificate = (certificate: typeof certificates[0]) => {
    setSelectedCertificate(certificate);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={elementRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Certificates & Achievements
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 transition-colors duration-300"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Professional certifications and achievements showcasing my expertise and continuous learning
            in data science and Full Stack development.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-wrap justify-center gap-4 mb-12"
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

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hardware-accelerated"
              >
                {/* Certificate Image */}
                <div 
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => openCertificate(certificate)}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 hardware-accelerated"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300">
                      <Award size={24} />
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {certificate.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center px-2 py-1 bg-accent-500 text-white rounded-full text-sm font-medium">
                        Featured
                      </div>
                    </div>
                  )}
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {certificate.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-primary-600 dark:text-primary-400 font-medium">{certificate.issuer}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{certificate.date}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 transition-colors duration-300">
                    {certificate.description}
                  </p>

                  {/* View Certificate Link */}
                  {certificate.link && (
                    <div className="flex justify-end">
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="mr-1">View Certificate</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Screen Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={closeCertificate}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeCertificate}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Certificate Image */}
                <div className="relative h-64 md:h-full">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Certificate Details */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                    {selectedCertificate.title}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary-600 dark:text-primary-400 font-medium">{selectedCertificate.issuer}</span>
                    <span className="text-gray-500 dark:text-gray-400">{selectedCertificate.date}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                    {selectedCertificate.description}
                  </p>
                  
                  {selectedCertificate.link && (
                    <a
                      href={selectedCertificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300"
                    >
                      <span className="mr-2">View Certificate</span>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;