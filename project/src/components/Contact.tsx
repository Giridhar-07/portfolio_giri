import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Copy, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Contact: React.FC = () => {
  const { isIntersecting, elementRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Get EmailJS credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID || process.env.REACT_APP_EMAILJS_USER_ID;
      
      if (!serviceId || !templateId || !userId) {
        throw new Error('EmailJS configuration is missing');
      }

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'giridharmalagi7@gmail.com'
      };
      
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      // Success
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setErrorMessage('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage('');
        setErrorMessage('');
      }, 5000);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('giridharmalagi7@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'giridharmalagi7@gmail.com',
      href: 'mailto:giridharmalagi7@gmail.com',
      copyable: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 (XXX) XXX-XXXX',
      href: 'tel:+91XXXXXXXXXX',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: 'https://maps.google.com/?q=India',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Giridhar-07',
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/giridhar-malagi-29588a239/',
      color: 'hover:text-blue-600',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/giridharmalagi',
      color: 'hover:text-blue-400',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={elementRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Let's Work Together
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 transition-colors duration-300"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Ready to collaborate on exciting projects or discuss opportunities? 
            I'd love to hear about your next challenge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                Whether you have a project in mind, want to discuss opportunities, 
                or just want to connect, I'm always excited to meet fellow 
                technology enthusiasts and potential collaborators.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900 rounded-lg transition-colors duration-300">
                    <item.icon className="text-primary-600 dark:text-primary-400 transition-colors duration-300" size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{item.label}</p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  </div>
                  {item.copyable && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={copyEmail}
                      className="p-2 text-gray-500 hover:text-primary-600 transition-colors duration-300"
                    >
                      {emailCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Connect With Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color} hardware-accelerated`}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 transition-colors duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Send Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hardware-accelerated"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg transition-colors duration-300"
                >
                  {submitMessage}
                </motion.div>
              )}
              
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-lg transition-colors duration-300"
                >
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;