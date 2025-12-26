import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { GanttChart } from './components/GanttChart';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToTop } from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <ScrollProgress />
      <Header />

      <main id="main-content">
        <Hero />
        <About />
        <GanttChart />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
