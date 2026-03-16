import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet, MatTabsModule],
  template: `
    <div class="row">
      <mat-tab-group [selectedIndex]="selectedIndex" (selectedIndexChange)="onTabChange($event)">
        <mat-tab label="Login"></mat-tab>
        <mat-tab label="Register"></mat-tab>
      </mat-tab-group>
      <router-outlet></router-outlet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  private _router: Router = inject(Router);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  selectedIndex: number = 0;

  ngOnInit(): void {
    const path: string | undefined = this._route.firstChild?.snapshot.routeConfig?.path;
    this.selectedIndex = path === 'login' ? 0 : 1;
  }

  onTabChange(index: number): void {
    const route: string = index === 0 ? 'login' : 'signup';
    this._router.navigate([route], { relativeTo: this._route });
  }
}
