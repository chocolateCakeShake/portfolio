import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import styles from './Hero.module.css';

export function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    if (typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: ['Frontend Lead', 'TypeScript Expert', 'JavaScript Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '_',
      });
    }
    return () => typedInstance.current?.destroy();
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className={styles.greeting}>Hi, I'm</p>
          <h1 className={styles.name}>{personalInfo.name}</h1>

          <div className={styles.role}>
            <span ref={typedRef} aria-label={personalInfo.title} />
          </div>

          <p className={styles.tagline}>{personalInfo.tagline}</p>

          <div className={styles.cta}>
            <a href="#contact" className="btn btn-primary">
              <Mail size={16} />
              Get in Touch
            </a>
            <a href="#experience" className="btn btn-secondary">
              View Experience
            </a>
          </div>

          <div className={styles.socials}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      <button
        className={styles.scrollDown}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to about"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
