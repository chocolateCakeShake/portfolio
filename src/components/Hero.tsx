import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import styles from './Hero.module.css';

export function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    if (typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [
          'Frontend Lead',
          'TypeScript Expert',
          'JavaScript Enthusiast',
          'UI/UX Developer',
          'Performance Optimizer',
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
      });
    }

    return () => {
      typedInstance.current?.destroy();
    };
  }, []);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      {/* Animated Background */}
      <div className={styles.background} aria-hidden="true">
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
        <div className={styles.particles}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -100],
                x: Math.sin(i) * 50,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '0%',
              }}
            />
          ))}
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Greeting */}
          <motion.p
            className={styles.greeting}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-mono">Hello, I'm</span>
          </motion.p>

          {/* Name */}
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {personalInfo.name}
            <span className={styles.alias}> aka {personalInfo.alias}</span>
          </motion.h1>

          {/* Animated Title */}
          <motion.div
            className={styles.titleWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className={styles.titlePrefix}>I'm a </span>
            <span ref={typedRef} className={styles.typedText} aria-label={personalInfo.title} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Location */}
          <motion.div
            className={styles.location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MapPin size={16} aria-hidden="true" />
            <span>{personalInfo.location}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a href="#contact" className="btn btn-accent">
              <Mail size={18} aria-hidden="true" />
              Get in Touch
            </a>
            <a href="#experience" className="btn btn-secondary">
              View My Work
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub Profile"
            >
              <Github size={22} aria-hidden="true" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={22} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className={styles.socialLink}
              aria-label="Send Email"
            >
              <Mail size={22} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Code Snippet Decoration */}
        <motion.div
          className={styles.codeSnippet}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          aria-hidden="true"
        >
          <pre className={styles.code}>
            <code>
              <span className={styles.keyword}>const</span>{' '}
              <span className={styles.variable}>developer</span> = {'{'}
              {'\n'}  <span className={styles.property}>name</span>:{' '}
              <span className={styles.string}>'M Abdullah'</span>,
              {'\n'}  <span className={styles.property}>role</span>:{' '}
              <span className={styles.string}>'Frontend Lead'</span>,
              {'\n'}  <span className={styles.property}>skills</span>: [
              {'\n'}    <span className={styles.string}>'TypeScript'</span>,
              {'\n'}    <span className={styles.string}>'React'</span>,
              {'\n'}    <span className={styles.string}>'Angular'</span>
              {'\n'}  ],
              {'\n'}  <span className={styles.property}>passion</span>:{' '}
              <span className={styles.string}>'Perfection'</span>
              {'\n'}{'}'};
            </code>
          </pre>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        className={styles.scrollDown}
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1,
          },
        }}
        aria-label="Scroll down to About section"
      >
        <ArrowDown size={24} aria-hidden="true" />
      </motion.button>
    </section>
  );
}
