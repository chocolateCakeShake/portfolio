import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  projects = [
    {
      title: 'LegacySuite',
      description: 'Angular application that  advanced digital asset management, including wallet monitoring, emergency backup, and inheritance solutions.',
      link: 'https://app.legacysuite.com',
    },
    {
      title: 'Sypore Portal',
      description: 'Angular application that provides a portal for Sypore clients to manage their clients, insights and more.',
      link: 'https://portal.sypore.net',
    },
  ];
}
