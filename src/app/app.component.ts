import { Component, OnInit, signal } from '@angular/core';
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
  isDarkTheme = signal<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.isDarkTheme.set(true);
  }

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme);
  }
}
