import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Code, Database, Globe } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { skills } from '../data/skills';

const Skills: React.FC = () => {
  const { isIntersecting, elementRef } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '-30px 0px'
  });

  const dataSkills = skills.filter(skill => skill.category === 'data');
  const webSkills = skills.filter(skill => skill.category === 'web');

  const SkillBar: React.FC<{ skill: typeof skills[0]; index: number }> = ({ skill, index }) => (
    <motion.div
      initial={{ opacity: 1, x: -30 }}
      animate={isIntersecting ? { opacity: 1, x: 0 } : { opacity: 1, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="mb-4 sm:mb-6"
    >
      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>{skill.years} year{skill.years !== 1 ? 's' : ''}</span>
          <span className="text-primary-600 dark:text-primary-400 font-semibold">{skill.level}%</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={isIntersecting ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.15 + 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-1.5 sm:h-2 rounded-full hardware-accelerated"
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={elementRef}
          initial={{ opacity: 1, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6 transition-colors duration-300"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            A comprehensive toolkit spanning data analysis and web development, 
            constantly evolving with industry trends and best practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Data Analytics Skills */}
          <motion.div
            initial={{ opacity: 1, y: 50 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hardware-accelerated"
          >
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900 rounded-lg mr-3 sm:mr-4 transition-colors duration-300">
                <BarChart3 className="text-primary-600 dark:text-primary-400 transition-colors duration-300" size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Data Analytics</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-colors duration-300">Turning data into actionable insights</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {dataSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Web Development Skills */}
          <motion.div
            initial={{ opacity: 1, y: 50 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hardware-accelerated"
          >
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 bg-secondary-100 dark:bg-secondary-900 rounded-lg mr-3 sm:mr-4 transition-colors duration-300">
                <Code className="text-secondary-600 dark:text-secondary-400 transition-colors duration-300" size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Web Development</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-colors duration-300">Building modern digital experiences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {webSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 1, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: 'Data Management',
                skills: ['SQL Server', 'NeonDB', 'PostgreSQL', 'Data Warehousing'],
              },
              {
                icon: Globe,
                title: 'Cloud & DevOps',
                skills: ['AWS', 'Docker', 'Git', 'CI/CD'],
              },
              {
                icon: BarChart3,
                title: 'Visualization',
                skills: ['Tableau', 'Power BI', 'D3.js', 'Plotly'],
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 1, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 1, y: 30 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg text-center hover:shadow-xl hover-lift transition-all duration-300 hardware-accelerated"
              >
                <div className="inline-flex p-2 sm:p-3 bg-accent-100 dark:bg-accent-900 rounded-lg mb-3 sm:mb-4 transition-colors duration-300">
                  <category.icon className="text-accent-600 dark:text-accent-400 transition-colors duration-300" size={24} />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 transition-colors duration-300">
                  {category.title}
                </h4>
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;