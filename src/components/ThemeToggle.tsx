import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className={styles.iconWrapper}
        initial={false}
        animate={{
          rotate: isDark ? 360 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Moon className={styles.icon} aria-hidden="true" />
        ) : (
          <Sun className={styles.icon} aria-hidden="true" />
        )}
      </motion.div>

      {/* Animated background effect */}
      <motion.div
        className={styles.background}
        initial={false}
        animate={{
          backgroundColor: isDark ? '#1a0f0a' : '#FFF8DC',
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effect on toggle */}
      <motion.div
        className={styles.ripple}
        key={theme}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </motion.button>
  );
}
