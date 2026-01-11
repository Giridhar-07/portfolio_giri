import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold text-primary-400 mb-4 transition-colors duration-300">
                  Giridhar Malagi
                </h3>
                <p className="text-gray-300 max-w-md transition-colors duration-300">
                  Passionate about transforming data into insights and creating 
                  digital experiences that make a difference. Always eager to 
                  take on new challenges and learn cutting-edge technologies.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'About', to: '/about' },
                    { label: 'Skills', to: '/skills' },
                    { label: 'Projects', to: '/projects' },
                    { label: 'Certificates', to: '/certificates' },
                    { label: 'Timeline', to: '/timeline' },
                    { label: 'Contact', to: '/contact' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="text-gray-300 hover:text-primary-400 transition-colors duration-300">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
                <div className="space-y-2">
                  <p className="text-gray-300 transition-colors duration-300">India</p>
                  <a
                    href="mailto:giridharmalagi7@gmail.com"
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300 block"
                  >
                    giridharmalagi7@gmail.com
                  </a>
                  <div className="flex space-x-4 pt-2">
                    {[
                      { icon: Github, href: 'https://github.com/Giridhar-07' },
                      { icon: Linkedin, href: 'http://linkedin.com/in/giridharmalagi' },
                      { icon: Mail, href: 'mailto:giridharmalagi7@gmail.com' },
                    ].map(({ icon: Icon, href }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        <Icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center text-gray-400 mb-4 md:mb-0 transition-colors duration-300"
            >
              <span>© {currentYear} Giridhar Malagi. Made with</span>
              <Heart size={16} className="text-red-500 mx-1" />
              <span>and lots of coffee</span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-all duration-300"
            >
              <span>Back to top</span>
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;