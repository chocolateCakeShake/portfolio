import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.content}>
          {/* Logo & Tagline */}
          <div className={styles.brand}>
            <a href="#hero" className={styles.logo}>
              <span className={styles.logoIcon}>🍫</span>
              <span className={styles.logoText}>ChocolateCakeShake</span>
            </a>
            <p className={styles.tagline}>
              Building apps like Porsche builds cars — elegant, beautiful, and engineered to perfection.
            </p>
          </div>

          {/* Quick Links */}
          <nav className={styles.links} aria-label="Footer navigation">
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className={styles.social}>
            <h4 className={styles.linksTitle}>Connect</h4>
            <div className={styles.socialLinks}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.socialLink}
              >
                <Github size={20} aria-hidden="true" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialLink}
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className={styles.socialLink}
              >
                <Mail size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <Heart size={14} className={styles.heart} aria-label="love" /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
