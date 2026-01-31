import { Routes } from '@angular/router';
import { TaskManagerResolver } from './services/resolvers/dashboard.resolver';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, resolve: { todos: TaskManagerResolver } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
