import { Routes } from '@angular/router';
import { TaskManagerResolver } from './services/resolvers/dashboard.resolver';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: 'dashboard', component: RegisterComponent, resolve: { todos: TaskManagerResolver } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
