import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskManagerResolver } from './services/resolvers/dashboard.resolver';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, resolve: { todos: TaskManagerResolver } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
