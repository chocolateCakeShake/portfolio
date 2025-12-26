import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, Code2, Coffee } from 'lucide-react';
import { personalInfo, certifications, education } from '../data/portfolio';
import styles from './About.module.css';

const stats = [
  { icon: Code2, label: 'Years Experience', value: '5+' },
  { icon: Coffee, label: 'Projects Delivered', value: '30+' },
  { icon: Award, label: 'Certifications', value: '2' },
  { icon: BookOpen, label: 'Technologies', value: '20+' },
];

export function About() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2
            id="about-title"
            className="section-title"
            variants={itemVariants}
          >
            About Me
          </motion.h2>

          <div className={styles.grid}>
            {/* Main Content */}
            <motion.div className={styles.content} variants={itemVariants}>
              <p className={styles.summary}>{personalInfo.summary}</p>

              <ul className={styles.highlights} role="list">
                {personalInfo.bio.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className={styles.highlightItem}
                  >
                    <span className={styles.bullet} aria-hidden="true">▹</span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Education */}
              <motion.div className={styles.education} variants={itemVariants}>
                <h3 className={styles.subsectionTitle}>
                  <BookOpen size={20} aria-hidden="true" />
                  Education
                </h3>
                <div className={styles.educationCard}>
                  <p className={styles.degree}>{education.degree}, {education.field}</p>
                  <p className={styles.institution}>{education.institution}</p>
                  <p className={styles.duration}>{education.duration}</p>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div className={styles.certifications} variants={itemVariants}>
                <h3 className={styles.subsectionTitle}>
                  <Award size={20} aria-hidden="true" />
                  Certifications
                </h3>
                <ul className={styles.certList} role="list">
                  {certifications.map((cert, index) => (
                    <li key={index} className={styles.certItem}>
                      {cert}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div className={styles.statsGrid} variants={itemVariants}>
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={styles.statCard}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <stat.icon className={styles.statIcon} size={32} aria-hidden="true" />
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
