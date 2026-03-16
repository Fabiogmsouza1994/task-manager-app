import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminModule } from './features/admin/admin.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('task-manager-app');
}
