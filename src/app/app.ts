import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar.component';
import { AdminModule } from './admin/admin.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AdminModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('task-manager-app');
}
