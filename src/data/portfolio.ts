import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string[];
  color: string;
  type: 'fulltime' | 'contract' | 'consulting' | 'internship';
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'soft';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

export const personalInfo = {
  name: 'M Abdullah',
  alias: 'ChocolateCakeShake',
  title: 'Frontend Lead',
  tagline: 'Everything TypeScript & JavaScript',
  email: 'abdullah6566@gmail.com',
  phone: '+923015219996',
  location: 'Lahore, Punjab, Pakistan',
  linkedin: 'https://www.linkedin.com/in/abdullah6566',
  portfolio: 'https://www.chocolatecakeshake.pro',
  github: 'https://github.com/chocolatecakeshake',
  summary: `I build apps like Porsche builds cars—elegant, beautiful, and engineered to perfection. Your go-to JavaScript guy. I craft any code that runs in your browser with precision and care. Optimization, rewrites, ideation, enhancements—I've got you covered. Let's turn your ideas into sleek, high-performance digital experiences.`,
  bio: [
    'Frontend Lead with 5+ years of experience building high-performance web applications',
    'Passionate about clean code, optimization, and pixel-perfect UI implementations',
    'Expert in TypeScript, React, Angular, and modern JavaScript ecosystems',
    'Proven track record of delivering complex features on tight deadlines',
  ],
};

export const experiences: Experience[] = [
  {
    id: 'soco',
    company: 'SOCO Engineers',
    role: 'Frontend Lead',
    startDate: '2024-10',
    endDate: null,
    location: 'Lahore, Punjab, Pakistan',
    description: [
      'Introduced guidelines and processes to streamline code reviews and uphold code quality',
      'Lead a two-person frontend team and coordinate with the Product Owner on future sprints',
      'Delivered a Gantt-style scheduler within 5 weeks, critical to the client\'s success',
      'Ported legacy features to a new codebase, saving the backend team from rewriting an essential module',
    ],
    color: '#C41E3A',
    type: 'fulltime',
  },
  {
    id: 'avento',
    company: 'Avento Labs',
    role: 'Software Engineer',
    startDate: '2022-08',
    endDate: '2024-10',
    location: 'Lahore, Punjab, Pakistan',
    description: [
      'Developed and maintained multiple client-facing web applications',
      'Implemented complex UI components and data visualizations',
      'Collaborated with cross-functional teams to deliver features',
      'Optimized application performance and bundle sizes',
    ],
    color: '#D2691E',
    type: 'fulltime',
  },
  {
    id: 'carspirit',
    company: 'Carspiritpk.com',
    role: 'Technical Consultant',
    startDate: '2020-03',
    endDate: '2022-11',
    location: 'Lahore, Punjab, Pakistan',
    description: [
      'Provided technical guidance and architecture recommendations',
      'Helped modernize legacy codebase to modern standards',
      'Consulted on best practices for web development',
    ],
    color: '#DAA520',
    type: 'consulting',
  },
  {
    id: 'hardstone',
    company: 'Hardstone Enterprises',
    role: 'Junior Software Developer',
    startDate: '2021-08',
    endDate: '2022-09',
    location: 'Lahore, Punjab, Pakistan',
    description: [
      'Developed frontend features for enterprise applications',
      'Worked with Angular and TypeScript',
      'Participated in agile development processes',
    ],
    color: '#8B5A2B',
    type: 'fulltime',
  },
  {
    id: 'cobalt',
    company: 'Cobalt-Tec',
    role: 'Development Intern',
    startDate: '2019-03',
    endDate: '2019-08',
    location: 'Lahore, Punjab, Pakistan',
    description: [
      'Learned web development fundamentals',
      'Assisted in building web applications',
      'Gained experience with JavaScript and frontend frameworks',
    ],
    color: '#5D3A1F',
    type: 'internship',
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'TypeScript', level: 95, category: 'frontend' },
  { name: 'JavaScript', level: 95, category: 'frontend' },
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Angular', level: 88, category: 'frontend' },
  { name: 'Vue.js', level: 75, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'HTML5', level: 95, category: 'frontend' },
  { name: 'CSS3/SCSS', level: 92, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'Express', level: 75, category: 'backend' },
  { name: 'PostgreSQL', level: 70, category: 'backend' },
  { name: 'MongoDB', level: 72, category: 'backend' },
  { name: 'GraphQL', level: 78, category: 'backend' },

  // Tools
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'AWS', level: 75, category: 'tools' },
  { name: 'Docker', level: 70, category: 'tools' },
  { name: 'Webpack/Vite', level: 85, category: 'tools' },
  { name: 'Jest/Vitest', level: 82, category: 'tools' },

  // Soft Skills
  { name: 'Team Leadership', level: 85, category: 'soft' },
  { name: 'Agile/Scrum', level: 88, category: 'soft' },
  { name: 'Communication', level: 90, category: 'soft' },
  { name: 'Problem Solving', level: 92, category: 'soft' },
];

export const certifications = [
  'Agile Project Management',
  'Google Project Management: Specialization',
];

export const education = {
  institution: 'National University of Computer and Emerging Sciences',
  degree: 'Bachelor of Science - BS',
  field: 'Computer Science',
  duration: '2015 - 2021',
};

// Helper function to calculate duration
export function calculateDuration(startDate: string, endDate: string | null): string {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : dayjs();

  const years = end.diff(start, 'year');
  const months = end.diff(start, 'month') % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);

  return parts.join(' ') || '< 1 month';
}

// Get timeline range for Gantt chart
export function getTimelineRange() {
  const allDates = experiences.flatMap((exp) => [
    dayjs(exp.startDate),
    exp.endDate ? dayjs(exp.endDate) : dayjs(),
  ]);

  const minDate = dayjs.min(allDates)!.startOf('year');
  const maxDate = dayjs.max(allDates)!.endOf('month');

  return { minDate, maxDate };
}
