import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'features-user-auth',
  imports: [MatTabsModule, RouterOutlet],
  templateUrl: 'user-auth.component.html',
  styleUrl: './user-auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAuthComponent {
  selectedIndex: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const path: string | undefined = this.route.firstChild?.snapshot.routeConfig?.path;
    this.selectedIndex = path === 'login' ? 1 : 0;
  }

  onTabChange(index: number) {
    const route = index === 0 ? 'signup' : 'login';
    this.router.navigate([route], { relativeTo: this.route });
  }
}
