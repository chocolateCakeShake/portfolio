import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserWindowRef, WINDOW, windowFactory } from './app.config';

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
  providers: [
    BrowserWindowRef,
    {
      provide: WINDOW,
      useFactory: windowFactory,
      deps: [ BrowserWindowRef, PLATFORM_ID ],
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  win: Window = inject(WINDOW) as Window;
  
  doc = inject(DOCUMENT);

  ngOnInit(): void {
    this.setDefaultMode();
  }

  setDefaultMode() {
    if (this.win.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.doc.body.setAttribute('data-bs-theme', 'dark');
    } else {
      this.doc.body.setAttribute('data-bs-theme', 'light');
    }
  }

  setMode(mode: string) {
    switch (mode.toLowerCase()) {
      case 'dark':
        this.doc.body.setAttribute('data-bs-theme', 'dark');
        break;
      case 'light':
        this.doc.body.setAttribute('data-bs-theme', 'light');
        break;
      default:
        this.setDefaultMode();
        break;
    }
  }
}
