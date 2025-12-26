import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { X } from 'lucide-react';
import { experiences, calculateDuration } from '../data/portfolio';
import type { Experience } from '../data/portfolio';
import styles from './GanttChart.module.css';

dayjs.extend(minMax);

export function GanttChart() {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [hoveredExp, setHoveredExp] = useState<Experience | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const timelineData = useMemo(() => {
    const allDates = experiences.flatMap((exp) => [
      dayjs(exp.startDate),
      exp.endDate ? dayjs(exp.endDate) : dayjs(),
    ]);
    const minDate = dayjs.min(allDates)!.startOf('year');
    const maxDate = dayjs().endOf('month');
    const totalMonths = maxDate.diff(minDate, 'month');

    const years: { year: number; position: number }[] = [];
    let currentYear = minDate.year();
    while (currentYear <= maxDate.year()) {
      const yearStart = dayjs(`${currentYear}-01-01`);
      const position = (yearStart.diff(minDate, 'month') / totalMonths) * 100;
      if (position >= 0 && position <= 100) {
        years.push({ year: currentYear, position });
      }
      currentYear++;
    }
    return { minDate, totalMonths, years };
  }, []);

  const bars = useMemo(() => {
    const { minDate, totalMonths } = timelineData;
    return experiences.map((exp) => {
      const start = dayjs(exp.startDate);
      const end = exp.endDate ? dayjs(exp.endDate) : dayjs();
      const left = (start.diff(minDate, 'month') / totalMonths) * 100;
      const width = (end.diff(start, 'month') / totalMonths) * 100;
      return { exp, left: Math.max(0, left), width: Math.min(width, 100 - left) };
    });
  }, [timelineData]);

  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedExp(null);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [selectedExp]);

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="section-title">Experience</h2>

          <div className={styles.chart}>
            {/* Year markers */}
            <div className={styles.years}>
              {timelineData.years.map(({ year, position }) => (
                <div key={year} className={styles.year} style={{ left: `${position}%` }}>
                  {year}
                </div>
              ))}
            </div>

            {/* Experience rows */}
            <div className={styles.rows}>
              {bars.map(({ exp, left, width }) => (
                <div key={exp.id} className={styles.row}>
                  <div className={styles.label}>
                    <span className={styles.company}>{exp.company}</span>
                    <span className={styles.role}>{exp.role}</span>
                  </div>
                  <div className={styles.track}>
                    <button
                      className={styles.bar}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      onClick={() => setSelectedExp(exp)}
                      onMouseEnter={() => setHoveredExp(exp)}
                      onMouseLeave={() => setHoveredExp(null)}
                      aria-label={`${exp.role} at ${exp.company}`}
                    >
                      <span className={styles.duration}>
                        {calculateDuration(exp.startDate, exp.endDate)}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hover info */}
          {hoveredExp && (
            <div className={styles.hoverInfo}>
              <strong>{hoveredExp.company}</strong> — {hoveredExp.role}
              <span className={styles.dates}>
                {dayjs(hoveredExp.startDate).format('MMM YYYY')} –{' '}
                {hoveredExp.endDate ? dayjs(hoveredExp.endDate).format('MMM YYYY') : 'Present'}
              </span>
            </div>
          )}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedExp && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
            >
              <motion.div
                className={styles.modal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <button className={styles.close} onClick={() => setSelectedExp(null)} aria-label="Close">
                  <X size={20} />
                </button>

                <h3 className={styles.modalTitle}>{selectedExp.role}</h3>
                <p className={styles.modalCompany}>{selectedExp.company}</p>
                <p className={styles.modalMeta}>
                  {dayjs(selectedExp.startDate).format('MMM YYYY')} –{' '}
                  {selectedExp.endDate ? dayjs(selectedExp.endDate).format('MMM YYYY') : 'Present'}
                  {' · '}{calculateDuration(selectedExp.startDate, selectedExp.endDate)}
                  {' · '}{selectedExp.location}
                </p>

                <ul className={styles.modalList}>
                  {selectedExp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
