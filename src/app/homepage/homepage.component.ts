import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPopover],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements AfterViewInit {
  // technologies = ['<Angular/>', '<React/>', '<Vue/>', '<NextJS/>'];
  // selectedTech = this.technologies[0];

  constructor() {}

  ngAfterViewInit() {
    // setInterval(() => {
    //   const index = this.technologies.indexOf(this.selectedTech);
    //   this.selectedTech =
    //     this.technologies[(index + 1) % this.technologies.length];
    // }, 2000);
  }
}
