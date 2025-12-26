import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className={styles.iconWrapper}>
        {isDark ? <Moon className={styles.icon} /> : <Sun className={styles.icon} />}
      </div>
    </button>
  );
}
