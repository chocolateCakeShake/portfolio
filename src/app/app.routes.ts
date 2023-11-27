import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'projects', component: ProjectsComponent },
];
