import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';

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
  ngOnInit(): void {
    this.setDefaultMode();
  }

  setDefaultMode() {
    if (window && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.setAttribute('data-bs-theme', 'dark');
    } else {
      document.body.setAttribute('data-bs-theme', 'light');
    }
  }

  setMode(mode: string) {
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
