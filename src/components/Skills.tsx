import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ReactECharts from 'echarts-for-react';
import { skills } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import styles from './Skills.module.css';

type SkillCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'soft';

const categoryLabels: Record<SkillCategory, string> = {
  all: 'All Skills',
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
  soft: 'Soft Skills',
};

const categoryColors: Record<string, string> = {
  frontend: '#C41E3A',
  backend: '#D2691E',
  tools: '#DAA520',
  soft: '#8B5A2B',
};

export function Skills() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return skills;
    return skills.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  // Radar Chart Options
  const radarOption = useMemo(() => {
    const categories = ['frontend', 'backend', 'tools', 'soft'] as const;
    const categoryAverages = categories.map((cat) => {
      const catSkills = skills.filter((s) => s.category === cat);
      return catSkills.reduce((sum, s) => sum + s.level, 0) / catSkills.length;
    });

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: theme === 'dark' ? '#2a1a12' : '#FDF5E6',
        borderColor: theme === 'dark' ? '#5D3A1F' : '#F5E6D3',
        textStyle: {
          color: theme === 'dark' ? '#FFF8DC' : '#3D2314',
        },
      },
      radar: {
        indicator: [
          { name: 'Frontend', max: 100 },
          { name: 'Backend', max: 100 },
          { name: 'Tools', max: 100 },
          { name: 'Soft Skills', max: 100 },
        ],
        shape: 'polygon',
        splitNumber: 5,
        axisName: {
          color: theme === 'dark' ? '#FFE4B5' : '#5D3A1F',
          fontSize: 12,
          fontFamily: 'Figtree',
        },
        splitLine: {
          lineStyle: {
            color: theme === 'dark' ? '#3d2519' : '#F5E6D3',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: theme === 'dark'
              ? ['rgba(45, 24, 16, 0.2)', 'rgba(45, 24, 16, 0.4)']
              : ['rgba(245, 230, 211, 0.3)', 'rgba(245, 230, 211, 0.5)'],
          },
        },
        axisLine: {
          lineStyle: {
            color: theme === 'dark' ? '#5D3A1F' : '#F5E6D3',
          },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: categoryAverages,
              name: 'Skill Level',
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                color: '#C41E3A',
                width: 2,
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(196, 30, 58, 0.4)' },
                    { offset: 1, color: 'rgba(196, 30, 58, 0.1)' },
                  ],
                },
              },
              itemStyle: {
                color: '#C41E3A',
              },
            },
          ],
        },
      ],
    };
  }, [theme]);

  // Bar Chart Options for selected category
  const barOption = useMemo(() => {
    const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level);

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: theme === 'dark' ? '#2a1a12' : '#FDF5E6',
        borderColor: theme === 'dark' ? '#5D3A1F' : '#F5E6D3',
        textStyle: {
          color: theme === 'dark' ? '#FFF8DC' : '#3D2314',
        },
        formatter: (params: { name: string; value: number }[]) => {
          const param = params[0];
          return `<strong>${param.name}</strong><br/>Proficiency: ${param.value}%`;
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          color: theme === 'dark' ? '#FFE4B5' : '#5D3A1F',
          formatter: '{value}%',
        },
        axisLine: {
          lineStyle: {
            color: theme === 'dark' ? '#5D3A1F' : '#F5E6D3',
          },
        },
        splitLine: {
          lineStyle: {
            color: theme === 'dark' ? '#3d2519' : '#F5E6D3',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: sortedSkills.map((s) => s.name),
        axisLabel: {
          color: theme === 'dark' ? '#FFF8DC' : '#3D2314',
          fontFamily: 'Fira Code',
          fontSize: 11,
        },
        axisLine: {
          lineStyle: {
            color: theme === 'dark' ? '#5D3A1F' : '#F5E6D3',
          },
        },
      },
      series: [
        {
          type: 'bar',
          data: sortedSkills.map((s) => ({
            value: s.level,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: categoryColors[s.category] || '#C41E3A' },
                  { offset: 1, color: '#DAA520' },
                ],
              },
              borderRadius: [0, 4, 4, 0],
            },
          })),
          barWidth: '60%',
          label: {
            show: true,
            position: 'right',
            formatter: '{c}%',
            color: theme === 'dark' ? '#FFE4B5' : '#5D3A1F',
            fontFamily: 'Fira Code',
            fontSize: 11,
          },
        },
      ],
    };
  }, [filteredSkills, theme]);

  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 id="skills-title" className="section-title">Skills & Expertise</h2>

          {/* Category Filter */}
          <div className={styles.filters} role="tablist" aria-label="Filter skills by category">
            {(Object.keys(categoryLabels) as SkillCategory[]).map((category) => (
              <button
                key={category}
                className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls="skills-chart"
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          <div className={styles.chartsGrid}>
            {/* Radar Chart */}
            <motion.div
              className={styles.chartCard}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.chartTitle}>Overview</h3>
              <div className={styles.chartWrapper}>
                <ReactECharts
                  option={radarOption}
                  style={{ height: '300px', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </motion.div>

            {/* Bar Chart */}
            <motion.div
              id="skills-chart"
              className={styles.chartCard}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              role="tabpanel"
            >
              <h3 className={styles.chartTitle}>
                {categoryLabels[selectedCategory]} Proficiency
              </h3>
              <div className={styles.chartWrapper}>
                <ReactECharts
                  option={barOption}
                  style={{ height: `${Math.max(300, filteredSkills.length * 35)}px`, width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            className={styles.skillsGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={styles.skillPill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  borderColor: categoryColors[skill.category],
                }}
              >
                <span className={styles.skillName}>{skill.name}</span>
                <span
                  className={styles.skillLevel}
                  style={{ color: categoryColors[skill.category] }}
                >
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
