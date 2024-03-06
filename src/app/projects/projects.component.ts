import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      title: 'Avento Website',
      description:
        'Revamped the website for Avento Labs. Built using NextJS, custom CSS and GSAP. Hosted on Vercel.',
      link: 'https://aventolabs.io',
    },
    {
      title: 'BezWallet',
      description:
        'Multi-chain cryptocurrency wallet that us built using Ionic and Angular. Uses a diverse set of libraries to create wallet, swap tokens and more.',
      link: 'https://play.google.com/store/apps/details?id=com.vozwallet.app&hl=en&gl=US',
    },
    {
      title: 'LegacySuite',
      description:
        'Built from th ground up using Angular, heavily themed Bootstrap. Firebase and Web3Auth for authentication. NestJS for the backend.',
      link: 'https://app.legacysuite.com',
    },
    {
      title: 'Heroes Of Holdem',
      description:
        'NFT Marketplace for the players of the game Heroes of Holdem. Uses MetaMask for for transactions. Built using Angular and Boostrap.',
      link: '',
    },
    {
      title: 'Sypore Portal',
      description:
        'Angular application that provides a portal for Sypore clients to manage their billing, support tickets and view periodic progress reports. Built using Angular Material and Charts.JS',
      link: 'https://portal.sypore.net',
    },
  ];
}
