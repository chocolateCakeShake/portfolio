import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Centaurus Marketplace',
      description: 'NFT Marketplace being built using NextJS and Supabase. Uses a custom Swiper Animiation.',
      link: 'https://centaurus-work.vercel.app/',
      timeline: {
        start: new Date('2021-08-09'),
        end: new Date('2022-08-12'),
      },
    },
    {
      title: 'The Octopus AI',
      description: 'Landing page for a new AI company. Built using NextJS, TailwindCSS and GSAP.',
      link: 'https://theoctopus-ai.vercel.app/',
      timeline: {
        start: new Date('2024-07-01'),
        end: 'Present',
      },
    },
    {
      title: 'Avento Website',
      description:
        'Revamped the website for Avento Labs. Built using NextJS, custom CSS and GSAP. Hosted on Vercel.',
      link: 'https://aventolabs.io',
      timeline: {
        start: new Date('2021-07-01'),
        end: new Date('2021-07-31'),
      },
    },
    {
      title: 'BezWallet',
      description:
        'Multi-chain cryptocurrency wallet that us built using Ionic and Angular. Uses a diverse set of libraries to create wallet, swap tokens and more.',
      link: 'https://play.google.com/store/apps/details?id=com.vozwallet.app&hl=en&gl=US',
      timeline: {
        start: new Date('2021-02-01'),
        end: new Date('2021-06-30'),
      },
    },
    {
      title: 'LegacySuite',
      description:
        'Built from th ground up using Angular, heavily themed Bootstrap. Firebase and Web3Auth for authentication. NestJS for the backend.',
      link: 'https://app.legacysuite.com',
      timeline: {
        start: new Date('2020-08-01'),
        end: new Date('2021-01-31'),
      },
    },
    {
      title: 'Heroes Of Holdem',
      description:
        'NFT Marketplace for the players of the game Heroes of Holdem. Uses MetaMask for for transactions. Built using Angular and Boostrap.',
      link: '',
      timeline: {
        start: new Date('2020-04-01'),
        end: new Date('2020-07-31'),
      },
    },
    {
      title: 'Sypore Portal',
      description:
        'Angular application that provides a portal for Sypore clients to manage their billing, support tickets and view periodic progress reports. Built using Angular Material and Charts.JS',
      link: 'https://portal.sypore.net',
      timeline: {
        start: new Date('2019-08-01'),
        end: new Date('2020-03-31'),
      },
    },
  ];
}
