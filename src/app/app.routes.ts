import { Routes } from '@angular/router';
import { UserAuthComponent } from './features/auth/user-auth/user-auth.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LoginComponent } from './features/auth/components/login/login.component';

/*resolve: { todos: TaskManagerResolver }*/

export const routes: Routes = [
  {
    path: '',
    component: UserAuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
    ],
  },
 // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 // { path: '**', redirectTo: '/dashboard' },
];
