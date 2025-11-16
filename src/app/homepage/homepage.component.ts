import { AfterViewInit, Component, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPopover],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements AfterViewInit {
  technologies = ['Angular', 'React', 'NextJS', 'Vue'];
  currentTechIndex = 0;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initGSAPAnimations();
      this.startTechRotation();
    }
  }

  initGSAPAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero heading
    tl.from('.hero-heading', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    })
      .from(
        '.hero-subtitle',
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5',
      )
      .from(
        '.tech-switcher',
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
        },
        '-=0.3',
      )
      .from(
        '.hero-buttons .btn',
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
        },
        '-=0.3',
      );

    // Floating animation for coffee emoji
    gsap.to('.floating-emoji', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Pulse animation for name
    gsap.to('.pulse-text', {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }

  startTechRotation() {
    setInterval(() => {
      this.currentTechIndex =
        (this.currentTechIndex + 1) % this.technologies.length;

      gsap.to('.tech-switcher', {
        text: `<${this.technologies[this.currentTechIndex]}/>`,
        duration: 0.5,
        ease: 'none',
      });
    }, 2000);
  }
}
