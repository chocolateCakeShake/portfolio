import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Sparkles } from 'lucide-react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    title: 'Gantt-Style Scheduler',
    description: 'Built a complex Gantt-style scheduling system in 5 weeks, featuring drag-and-drop functionality, resource allocation, and real-time updates. Critical to the client\'s operational success.',
    technologies: ['React', 'TypeScript', 'DayJS', 'Custom Hooks'],
    color: '#C41E3A',
    icon: '📅',
  },
  {
    id: 2,
    title: 'Legacy Module Port',
    description: 'Successfully ported critical legacy features to a modern codebase, saving the backend team significant development time and maintaining backward compatibility.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx'],
    color: '#D2691E',
    icon: '🔄',
  },
  {
    id: 3,
    title: 'Code Review System',
    description: 'Introduced comprehensive guidelines and processes to streamline code reviews, resulting in improved code quality and faster development cycles.',
    technologies: ['ESLint', 'Prettier', 'Husky', 'GitHub Actions'],
    color: '#DAA520',
    icon: '✅',
  },
  {
    id: 4,
    title: 'Performance Optimization Suite',
    description: 'Developed a suite of performance optimization tools and practices, reducing bundle sizes by 40% and improving load times significantly.',
    technologies: ['Webpack', 'Vite', 'Lighthouse', 'Web Vitals'],
    color: '#8B5A2B',
    icon: '⚡',
  },
  {
    id: 5,
    title: 'Component Library',
    description: 'Created a reusable component library with 50+ components, complete with documentation, accessibility features, and theming support.',
    technologies: ['React', 'Storybook', 'TypeScript', 'CSS Modules'],
    color: '#5D3A1F',
    icon: '📦',
  },
];

const testimonials = [
  {
    id: 1,
    quote: 'Abdullah delivered a complex scheduling feature in record time. His attention to detail and code quality is exceptional.',
    author: 'Product Owner',
    company: 'SOCO Engineers',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    quote: 'Working with Abdullah transformed our frontend architecture. He brought structure and best practices that improved our entire team.',
    author: 'Tech Lead',
    company: 'Avento Labs',
    avatar: '👩‍💻',
  },
  {
    id: 3,
    quote: 'His expertise in TypeScript and modern JavaScript frameworks is unmatched. A true asset to any development team.',
    author: 'Senior Developer',
    company: 'Previous Project',
    avatar: '🧑‍💻',
  },
];

export function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 id="projects-title" className="section-title">Featured Work</h2>

          <p className={styles.subtitle}>
            A showcase of impactful projects and deliverables from my professional journey.
          </p>

          {/* Projects Swiper */}
          <div className={styles.swiperContainer}>
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              className={styles.swiper}
              a11y={{
                prevSlideMessage: 'Previous project',
                nextSlideMessage: 'Next project',
                paginationBulletMessage: 'Go to project {{index}}',
              }}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id} className={styles.slide}>
                  <motion.article
                    className={styles.projectCard}
                    whileHover={{ y: -5 }}
                    style={{ '--accent-color': project.color } as React.CSSProperties}
                  >
                    <div className={styles.projectIcon}>{project.icon}</div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <div className={styles.techStack}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Testimonials */}
          <motion.div
            className={styles.testimonialsSection}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className={styles.testimonialsTitle}>
              <Sparkles size={24} aria-hidden="true" />
              What People Say
            </h3>

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              className={styles.testimonialSwiper}
              a11y={{
                paginationBulletMessage: 'Go to testimonial {{index}}',
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <blockquote className={styles.testimonialCard}>
                    <p className={styles.quote}>"{testimonial.quote}"</p>
                    <footer className={styles.testimonialAuthor}>
                      <span className={styles.avatar}>{testimonial.avatar}</span>
                      <div>
                        <cite className={styles.authorName}>{testimonial.author}</cite>
                        <span className={styles.authorCompany}>{testimonial.company}</span>
                      </div>
                    </footer>
                  </blockquote>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
