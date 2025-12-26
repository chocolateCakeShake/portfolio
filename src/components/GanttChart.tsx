import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { Calendar, MapPin, Briefcase, X } from 'lucide-react';

import { experiences, calculateDuration } from '../data/portfolio';
import type { Experience } from '../data/portfolio';
import styles from './GanttChart.module.css';

dayjs.extend(minMax);

interface TooltipState {
  experience: Experience | null;
  x: number;
  y: number;
}

export function GanttChart() {
  const [tooltip, setTooltip] = useState<TooltipState>({ experience: null, x: 0, y: 0 });
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Calculate timeline range
  const timelineData = useMemo(() => {
    const allDates = experiences.flatMap((exp) => [
      dayjs(exp.startDate),
      exp.endDate ? dayjs(exp.endDate) : dayjs(),
    ]);

    const minDate = dayjs.min(allDates)!.startOf('year');
    const maxDate = dayjs().endOf('month');
    const totalMonths = maxDate.diff(minDate, 'month');

    // Generate year markers
    const years: { year: number; position: number }[] = [];
    let currentYear = minDate.year();
    while (currentYear <= maxDate.year()) {
      const yearStart = dayjs(`${currentYear}-01-01`);
      const position = ((yearStart.diff(minDate, 'month')) / totalMonths) * 100;
      if (position >= 0 && position <= 100) {
        years.push({ year: currentYear, position });
      }
      currentYear++;
    }

    return { minDate, maxDate, totalMonths, years };
  }, []);

  // Calculate bar positions for each experience
  const experienceBars = useMemo(() => {
    const { minDate, totalMonths } = timelineData;

    return experiences.map((exp) => {
      const start = dayjs(exp.startDate);
      const end = exp.endDate ? dayjs(exp.endDate) : dayjs();

      const startPosition = ((start.diff(minDate, 'month')) / totalMonths) * 100;
      const endPosition = ((end.diff(minDate, 'month')) / totalMonths) * 100;
      const width = endPosition - startPosition;

      return {
        experience: exp,
        left: Math.max(0, startPosition),
        width: Math.min(width, 100 - startPosition),
      };
    });
  }, [timelineData]);

  // Handle tooltip positioning
  const handleMouseEnter = (e: React.MouseEvent, exp: Experience) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        experience: exp,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && tooltip.experience) {
      setTooltip((prev) => ({
        ...prev,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ experience: null, x: 0, y: 0 });
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedExperience(null);
      }
    };

    if (selectedExperience) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedExperience]);

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className="container">
        <motion.h2
          id="experience-title"
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Career Timeline
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My professional journey visualized. Click on any experience to learn more.
        </motion.p>

        <motion.div
          ref={ref}
          className={styles.ganttContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Legend */}
          <div className={styles.legend} role="list" aria-label="Experience types">
            <div className={styles.legendItem} role="listitem">
              <span className={styles.legendDot} style={{ background: '#C41E3A' }} />
              <span>Full-time</span>
            </div>
            <div className={styles.legendItem} role="listitem">
              <span className={styles.legendDot} style={{ background: '#DAA520' }} />
              <span>Consulting</span>
            </div>
            <div className={styles.legendItem} role="listitem">
              <span className={styles.legendDot} style={{ background: '#5D3A1F' }} />
              <span>Internship</span>
            </div>
          </div>

          {/* Timeline Container */}
          <div
            ref={containerRef}
            className={styles.timeline}
            onMouseMove={handleMouseMove}
            role="list"
            aria-label="Career timeline"
          >
            {/* Year Markers */}
            <div className={styles.yearMarkers} aria-hidden="true">
              {timelineData.years.map(({ year, position }) => (
                <div
                  key={year}
                  className={styles.yearMarker}
                  style={{ left: `${position}%` }}
                >
                  <span className={styles.yearLabel}>{year}</span>
                  <div className={styles.yearLine} />
                </div>
              ))}
            </div>

            {/* Experience Rows */}
            <div className={styles.rows}>
              {experienceBars.map(({ experience, left, width }, index) => (
                <motion.div
                  key={experience.id}
                  className={styles.row}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  role="listitem"
                >
                  {/* Company Label */}
                  <div className={styles.rowLabel}>
                    <span className={styles.company}>{experience.company}</span>
                    <span className={styles.role}>{experience.role}</span>
                  </div>

                  {/* Bar Container (relative positioning context) */}
                  <div className={styles.barContainer}>
                    {/* Experience Bar (absolute positioning) */}
                    <motion.button
                      className={styles.bar}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: experience.color,
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, experience)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => setSelectedExperience(experience)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      aria-label={`${experience.role} at ${experience.company}, ${calculateDuration(experience.startDate, experience.endDate)}`}
                    >
                      <span className={styles.barText}>
                        {calculateDuration(experience.startDate, experience.endDate)}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
              {tooltip.experience && (
                <motion.div
                  className={styles.tooltip}
                  style={{
                    left: tooltip.x,
                    top: tooltip.y - 10,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  role="tooltip"
                >
                  <div className={styles.tooltipHeader}>
                    <span
                      className={styles.tooltipDot}
                      style={{ background: tooltip.experience.color }}
                    />
                    <strong>{tooltip.experience.company}</strong>
                  </div>
                  <p className={styles.tooltipRole}>{tooltip.experience.role}</p>
                  <div className={styles.tooltipMeta}>
                    <Calendar size={14} aria-hidden="true" />
                    <span>
                      {dayjs(tooltip.experience.startDate).format('MMM YYYY')} -{' '}
                      {tooltip.experience.endDate
                        ? dayjs(tooltip.experience.endDate).format('MMM YYYY')
                        : 'Present'}
                    </span>
                  </div>
                  <div className={styles.tooltipMeta}>
                    <MapPin size={14} aria-hidden="true" />
                    <span>{tooltip.experience.location}</span>
                  </div>
                  <p className={styles.tooltipHint}>Click for details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Current Date Indicator */}
          <div className={styles.nowIndicator}>
            <span>Now</span>
          </div>
        </motion.div>

        {/* Experience Modal */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <motion.div
                className={styles.modal}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.modalClose}
                  onClick={() => setSelectedExperience(null)}
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>

                <div
                  className={styles.modalAccent}
                  style={{ background: selectedExperience.color }}
                />

                <div className={styles.modalContent}>
                  <h3 id="modal-title" className={styles.modalTitle}>
                    {selectedExperience.role}
                  </h3>
                  <p className={styles.modalCompany}>
                    <Briefcase size={18} aria-hidden="true" />
                    {selectedExperience.company}
                  </p>

                  <div className={styles.modalMeta}>
                    <div className={styles.modalMetaItem}>
                      <Calendar size={16} aria-hidden="true" />
                      <span>
                        {dayjs(selectedExperience.startDate).format('MMMM YYYY')} -{' '}
                        {selectedExperience.endDate
                          ? dayjs(selectedExperience.endDate).format('MMMM YYYY')
                          : 'Present'}
                      </span>
                    </div>
                    <div className={styles.modalMetaItem}>
                      <MapPin size={16} aria-hidden="true" />
                      <span>{selectedExperience.location}</span>
                    </div>
                  </div>

                  <div className={styles.modalDuration}>
                    {calculateDuration(selectedExperience.startDate, selectedExperience.endDate)}
                  </div>

                  <h4 className={styles.modalSubtitle}>Key Responsibilities</h4>
                  <ul className={styles.modalList}>
                    {selectedExperience.description.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
