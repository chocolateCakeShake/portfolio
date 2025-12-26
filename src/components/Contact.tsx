import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Linkedin, Github, Send, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import styles from './Contact.module.css';

export function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormState({ name: '', email: '', message: '' });

    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/abdullah6566',
      href: personalInfo.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/chocolatecakeshake',
      href: personalInfo.github,
      external: true,
    },
  ];

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 id="contact-title" className="section-title">Get in Touch</h2>

          <p className={styles.subtitle}>
            Let's turn your ideas into sleek, high-performance digital experiences.
            I'm always open to discussing new projects and opportunities.
          </p>

          <div className={styles.grid}>
            {/* Contact Info */}
            <motion.div
              className={styles.info}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.infoTitle}>Contact Information</h3>

              <ul className={styles.contactList} role="list">
                {contactLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      className={styles.contactLink}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      <span className={styles.iconWrapper}>
                        <link.icon size={20} aria-hidden="true" />
                      </span>
                      <span className={styles.contactDetails}>
                        <span className={styles.contactLabel}>{link.label}</span>
                        <span className={styles.contactValue}>
                          {link.value}
                          {link.external && <ExternalLink size={14} aria-hidden="true" />}
                        </span>
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Decorative Element */}
              <div className={styles.decorative} aria-hidden="true">
                <div className={styles.decorativeCircle} />
                <div className={styles.decorativeText}>
                  <span className="text-mono">// Let's build</span>
                  <span className="text-mono">// something great</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="john@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className={`btn btn-accent ${styles.submitBtn}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.p
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
