import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet],
  template: `<app-navbar></app-navbar>
             <div class="app-container">
                <router-outlet></router-outlet>
             </div>`,
  styleUrl: './main-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
