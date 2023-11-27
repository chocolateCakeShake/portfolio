import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NgbDropdownModule,
  NgbNav,
  NgbNavLink,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbNav, NgbNavLink, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isDarkMode = signal(false);
}
