import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { TourService } from './services/tour.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterOutlet,
    NgbDropdown,
    RouterLink,
    HomepageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private tourService: TourService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.setDefaultMode();
    if (isPlatformBrowser(this.platformId)) {
      this.tourService.startTour();
    }
  }

  setDefaultMode() {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute('data-bs-theme', 'dark');
      } else {
        document.body.setAttribute('data-bs-theme', 'light');
      }
    }
  }

  setMode(mode: string) {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      switch (mode.toLowerCase()) {
        case 'dark':
          document.body.setAttribute('data-bs-theme', 'dark');
          break;
        case 'light':
          document.body.setAttribute('data-bs-theme', 'light');
          break;
        default:
          this.setDefaultMode();
          break;
      }
    }
  }
}
