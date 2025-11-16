import { AfterViewInit, Component, ElementRef, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  company: string;
  role: string;
  start: Date;
  end: Date | 'Present';
  duration: string;
  highlights: string[];
  color: string;
  icon: string;
}

interface Project {
  name: string;
  year: number;
  tech: string[];
  description: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('skillsChart') skillsChartRef!: ElementRef;
  @ViewChild('techEvolutionChart') techEvolutionChartRef!: ElementRef;
  @ViewChild('projectTimelineChart') projectTimelineChartRef!: ElementRef;
  @ViewChild('careerProgressChart') careerProgressChartRef!: ElementRef;

  private skillsChart?: ECharts;
  private techEvolutionChart?: ECharts;
  private projectTimelineChart?: ECharts;
  private careerProgressChart?: ECharts;

  experiences: Experience[] = [
    {
      company: 'SOCO Engineers',
      role: 'Lead Frontend Engineer',
      start: new Date('2024-10-01'),
      end: 'Present',
      duration: '3 months',
      highlights: [
        'Reduced load time from 30s to 3s',
        'Ported legacy jQuery to NextJS in 2 weeks',
        'Built technical hiring pipeline',
        'Established engineering standards'
      ],
      color: '#b52e31',
      icon: 'bi-rocket-takeoff'
    },
    {
      company: 'Avento Labs',
      role: 'Software Engineer',
      start: new Date('2022-08-01'),
      end: new Date('2024-10-01'),
      duration: '2 years 2 months',
      highlights: [
        'Led 4 cutting-edge NextJS projects',
        'Web3 integration on Ethereum and Tron',
        'Built full-fledged crypto wallet',
        'Mentored new hires'
      ],
      color: '#6b3e26',
      icon: 'bi-code-slash'
    },
    {
      company: 'Hardstone Enterprises',
      role: 'Junior Developer',
      start: new Date('2021-08-01'),
      end: new Date('2022-08-01'),
      duration: '1 year',
      highlights: [
        'Created interactive dashboards with Charts.js',
        'Reduced API calls by 70% with Redux',
        'Backend ownership with .NET',
        'US client liaison'
      ],
      color: '#8b5a3c',
      icon: 'bi-graph-up'
    },
    {
      company: 'CarSpiritPK.com',
      role: 'System Admin & Content Writer',
      start: new Date('2020-03-01'),
      end: new Date('2022-12-01'),
      duration: '2 years 9 months',
      highlights: [
        'Improved page load speeds by 40%',
        'Migrated to DigitalOcean (+30% performance)',
        'SEO-friendly content creation'
      ],
      color: '#a0785c',
      icon: 'bi-pen'
    }
  ];

  projects: Project[] = [
    { name: 'SIMuSPACE', year: 2024, tech: ['NextJS', 'CAD'], description: 'Multi-tiered CAD app' },
    { name: 'Centaurus Marketplace', year: 2024, tech: ['NextJS', 'Supabase'], description: 'NFT Marketplace' },
    { name: 'Avento Website', year: 2024, tech: ['NextJS', 'GSAP'], description: 'Company website' },
    { name: 'Bez Wallet', year: 2023, tech: ['Ionic', 'Angular'], description: 'Crypto wallet' },
    { name: 'Legacy Suite', year: 2022, tech: ['Angular', 'Web3'], description: 'Digital asset management' },
    { name: 'Sypore Portal', year: 2021, tech: ['Angular', 'Material'], description: 'Medical billing app' }
  ];

  skills = {
    frontend: ['NextJS', 'React', 'Angular', 'TypeScript', 'JavaScript'],
    styling: ['TailwindCSS', 'Bootstrap', 'SCSS'],
    backend: ['PostgreSQL', 'Supabase', 'NestJS'],
    tools: ['Git', 'Ionic', 'Web3']
  };

  timelineStart = new Date('2020-03-01');
  timelineEnd = new Date();

  selectedExperience: Experience | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initCharts();
        this.initAnimations();
      }, 100);
    }
  }

  initAnimations() {
    gsap.from('.gantt-bar', {
      scaleX: 0,
      transformOrigin: 'left',
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gantt-container',
        start: 'top 80%',
      }
    });

    gsap.from('.stat-card', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
      }
    });
  }

  initCharts() {
    this.initSkillsRadar();
    this.initTechEvolution();
    this.initProjectTimeline();
    this.initCareerProgress();
  }

  initSkillsRadar() {
    if (!this.skillsChartRef) return;

    this.skillsChart = echarts.init(this.skillsChartRef.nativeElement);

    const option = {
      title: {
        text: 'Technical Skills Radar',
        left: 'center',
        textStyle: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'NextJS/React', max: 100 },
          { name: 'Angular', max: 100 },
          { name: 'TypeScript', max: 100 },
          { name: 'CSS/Styling', max: 100 },
          { name: 'Backend', max: 100 },
          { name: 'Web3', max: 100 }
        ],
        shape: 'polygon',
        splitNumber: 4,
        name: {
          textStyle: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(181, 46, 49, 0.2)'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(181, 46, 49, 0.05)', 'rgba(107, 62, 38, 0.05)']
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(181, 46, 49, 0.3)'
          }
        }
      },
      series: [{
        name: 'Skills',
        type: 'radar',
        data: [{
          value: [95, 90, 95, 90, 75, 80],
          name: 'Current Level',
          areaStyle: {
            color: 'rgba(181, 46, 49, 0.3)'
          },
          lineStyle: {
            color: '#b52e31',
            width: 2
          },
          itemStyle: {
            color: '#b52e31'
          }
        }]
      }]
    };

    this.skillsChart.setOption(option);
  }

  initTechEvolution() {
    if (!this.techEvolutionChartRef) return;

    this.techEvolutionChart = echarts.init(this.techEvolutionChartRef.nativeElement);

    const option = {
      title: {
        text: 'Technology Stack Evolution',
        left: 'center',
        textStyle: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 0,
        textStyle: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024', '2025'],
        axisLabel: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Proficiency',
        axisLabel: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      series: [
        {
          name: 'Angular',
          type: 'line',
          smooth: true,
          data: [0, 40, 75, 85, 90, 90],
          itemStyle: { color: '#b52e31' },
          areaStyle: { color: 'rgba(181, 46, 49, 0.2)' }
        },
        {
          name: 'React/NextJS',
          type: 'line',
          smooth: true,
          data: [0, 0, 30, 60, 85, 95],
          itemStyle: { color: '#6b3e26' },
          areaStyle: { color: 'rgba(107, 62, 38, 0.2)' }
        },
        {
          name: 'TypeScript',
          type: 'line',
          smooth: true,
          data: [0, 50, 70, 85, 95, 95],
          itemStyle: { color: '#8b5a3c' },
          areaStyle: { color: 'rgba(139, 90, 60, 0.2)' }
        }
      ]
    };

    this.techEvolutionChart.setOption(option);
  }

  initProjectTimeline() {
    if (!this.projectTimelineChartRef) return;

    this.projectTimelineChart = echarts.init(this.projectTimelineChartRef.nativeElement);

    const option = {
      title: {
        text: 'Project Timeline & Tech Stack',
        left: 'center',
        textStyle: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `<strong>${params.name}</strong><br/>${params.data.description}<br/>Tech: ${params.data.tech.join(', ')}`;
        }
      },
      xAxis: {
        type: 'category',
        data: ['2021', '2022', '2023', '2024'],
        axisLabel: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Projects',
        max: 3,
        axisLabel: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      series: [{
        type: 'scatter',
        symbolSize: (val: any) => val[2] * 15,
        data: this.projects.map((p, idx) => ({
          name: p.name,
          value: [String(p.year), (idx % 3) + 1, Math.random() * 2 + 1],
          description: p.description,
          tech: p.tech,
          itemStyle: {
            color: `rgba(${181 - idx * 20}, ${46 + idx * 10}, ${49 + idx * 5}, 0.8)`
          }
        }))
      }]
    };

    this.projectTimelineChart.setOption(option);
  }

  initCareerProgress() {
    if (!this.careerProgressChartRef) return;

    this.careerProgressChart = echarts.init(this.careerProgressChartRef.nativeElement);

    const option = {
      title: {
        text: 'Career Growth Journey',
        left: 'center',
        textStyle: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          color: getComputedStyle(document.documentElement).getPropertyValue('--bs-body-color') || '#333'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: [
          { value: 15, name: 'Leadership & Hiring', itemStyle: { color: '#b52e31' } },
          { value: 35, name: 'Frontend Development', itemStyle: { color: '#6b3e26' } },
          { value: 25, name: 'Web3 & Blockchain', itemStyle: { color: '#8b5a3c' } },
          { value: 15, name: 'Performance Optimization', itemStyle: { color: '#a0785c' } },
          { value: 10, name: 'Content & SEO', itemStyle: { color: '#b59080' } }
        ]
      }]
    };

    this.careerProgressChart.setOption(option);
  }

  getPositionLeft(start: Date): string {
    const totalDuration = this.timelineEnd.getTime() - this.timelineStart.getTime();
    const offset = start.getTime() - this.timelineStart.getTime();
    return `${(offset / totalDuration) * 100}%`;
  }

  getWidth(start: Date, end: Date | 'Present'): string {
    const endDate = end === 'Present' ? this.timelineEnd : end;
    const duration = endDate.getTime() - start.getTime();
    const totalDuration = this.timelineEnd.getTime() - this.timelineStart.getTime();
    return `${(duration / totalDuration) * 100}%`;
  }

  selectExperience(exp: Experience) {
    this.selectedExperience = this.selectedExperience === exp ? null : exp;
  }

  getTotalYearsOfExperience(): number {
    return Math.floor((this.timelineEnd.getTime() - new Date('2020-03-01').getTime()) / (1000 * 60 * 60 * 24 * 365 * 1.2));
  }

  getProjectsCompleted(): number {
    return this.projects.length + 8; // Plus other projects
  }

  getCompaniesWorkedAt(): number {
    return this.experiences.length;
  }

  getTechnologiesMastered(): number {
    return Object.values(this.skills).flat().length;
  }
}
