import { Injectable } from '@angular/core';

// Import Shepherd.js types and class
declare const require: any;
const Shepherd = require('shepherd.js');

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private tour: any | null = null;

  constructor() {}

  initTour(): void {
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true,
        },
      },
    });

    this.addSteps();
  }

  private addSteps(): void {
    if (!this.tour) return;

    // Step 1: Welcome
    this.tour.addStep({
      id: 'welcome',
      text: `
        <h3>Welcome to my Portfolio! 🎉</h3>
        <p>I'm Abdullah, a Full-Stack Developer. Let me show you around!</p>
      `,
      buttons: [
        {
          text: 'Skip Tour',
          action: this.tour.cancel,
          secondary: true,
        },
        {
          text: 'Start Tour',
          action: this.tour.next,
        },
      ],
    });

    // Step 2: Hero Section
    this.tour.addStep({
      id: 'hero',
      text: `
        <h3>Hero Section</h3>
        <p>This is where you'll find a quick intro about me. Notice the animated tech stack that rotates through the frameworks I work with!</p>
      `,
      attachTo: {
        element: '.hero-heading',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Back',
          action: this.tour.back,
          secondary: true,
        },
        {
          text: 'Next',
          action: this.tour.next,
        },
      ],
    });

    // Step 3: Call to Action Buttons
    this.tour.addStep({
      id: 'cta',
      text: `
        <h3>Let's Connect!</h3>
        <p>You can download my resume or chat with me directly on WhatsApp. I'm always open to new opportunities!</p>
      `,
      attachTo: {
        element: '.hero-buttons',
        on: 'top',
      },
      buttons: [
        {
          text: 'Back',
          action: this.tour.back,
          secondary: true,
        },
        {
          text: 'Next',
          action: this.tour.next,
        },
      ],
    });

    // Step 4: Navigation
    this.tour.addStep({
      id: 'navigation',
      text: `
        <h3>Navigation</h3>
        <p>Use this navbar to explore different sections. Don't forget to check out my projects! Also, you can toggle between dark and light modes.</p>
      `,
      attachTo: {
        element: 'nav.navbar',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Back',
          action: this.tour.back,
          secondary: true,
        },
        {
          text: 'Next',
          action: this.tour.next,
        },
      ],
    });

    // Step 5: Projects
    this.tour.addStep({
      id: 'projects',
      text: `
        <h3>Explore My Work</h3>
        <p>Click on "Projects" in the navigation to see my portfolio. I've built everything from NFT marketplaces to AI landing pages!</p>
      `,
      attachTo: {
        element: 'a[href="/projects"]',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Back',
          action: this.tour.back,
          secondary: true,
        },
        {
          text: 'Finish Tour',
          action: this.tour.complete,
        },
      ],
    });
  }

  startTour(): void {
    // Check if user has seen the tour before
    const hasSeenTour = localStorage.getItem('portfolioTourCompleted');

    if (!hasSeenTour) {
      if (!this.tour) {
        this.initTour();
      }

      setTimeout(() => {
        this.tour?.start();
      }, 1500); // Start tour after 1.5 seconds to let animations complete

      // Mark tour as completed when it ends
      this.tour?.on('complete', () => {
        localStorage.setItem('portfolioTourCompleted', 'true');
      });

      this.tour?.on('cancel', () => {
        localStorage.setItem('portfolioTourCompleted', 'true');
      });
    }
  }

  // Method to manually restart tour (can be called from a button)
  restartTour(): void {
    localStorage.removeItem('portfolioTourCompleted');
    if (!this.tour) {
      this.initTour();
    }
    this.tour?.start();
  }
}
