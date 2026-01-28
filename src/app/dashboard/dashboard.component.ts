import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { DashboardService } from './services/dashboard.service';
import { FormatingDatePipe } from '../pipes/date-format.pipe';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule, MatSelectModule, FormatingDatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(
    private readonly _service: DashboardService,
    private readonly _alertService: AlertService,
    private readonly _route: ActivatedRoute,
  ) {
    this.tasks = this._route.snapshot.data['todos'].data;
  }

  tasks: DashboardInterface[] = [];

  categories: string[] = [
    'work',
    'personal',
    'shopping',
    'health',
    'finance',
    'education',
    'other',
  ];
  priorities: string[] = ['low', 'medium', 'high'];
  statuses: string[] = ['pending', 'in-progress', 'completed', 'cancelled'];

  newTask: {
    title: string;
    description: string;
    category: string;
    priority: string;
    dueDate: string;
    status: string;
  } = {
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending',
  };

  filterStatus: string = 'all';
  filterCategory: string = 'all';
  filterPriority: string = 'all';
  showCompleted: boolean = false;

  get completionColor(): string {
    if (this.getCompletionRate() > 70) return 'green';
    if (this.getCompletionRate() > 40) return 'orange';
    return 'red';
  }

  getCompletedTasksCount(): number {
    return this.tasks.filter((task: DashboardInterface) => task.status === 'completed').length;
  }

  getPendingTasksCount(): number {
    return this.tasks.filter((task: DashboardInterface) => task.status === 'pending').length;
  }

  getOverdueTasksCount(): number {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    return this.tasks.filter((task: DashboardInterface) => new Date(task.dueDate) < today).length;
  }

  getCompletionRate(): number {
    if (this.tasks.length === 0) return 0;
    return Math.round((this.getCompletedTasksCount() / this.tasks.length) * 100);
  }

  getProductivityLevel(): string {
    const rate = this.getCompletionRate();
    if (rate >= 80) return 'excelent';
    if (rate >= 60) return 'good';
    if (rate >= 40) return 'needs-improvement';
    return 'poor';
  }

  onBlur(title: string) {}

  onFocus(title: string) {}

  addTask() {
    if (!this.newTask.title || !this.newTask.category || !this.newTask.dueDate) {
      return;
    }

    const task: DashboardInterface = {
      title: this.newTask.title,
      description: this.newTask.description,
      category: this.newTask.category,
      priority: this.newTask.priority,
      dueDate: this.formatDateOnly(new Date(this.newTask.dueDate)),
      status: this.newTask.status,
    };

    this.tasks.push(task);
    this._service.addData(task).subscribe(() => {});
    this.clearForm();
  }

  private formatDateOnly(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  clearForm(): void {
    this.newTask = {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending',
    };
  }

  getFilteredTasks(): DashboardInterface[] {
    let filtered = [...this.tasks];

    if (this.filterStatus !== 'all') {
      filtered = filtered.filter((task) => task.status === this.filterStatus);
    }

    if (this.filterCategory !== 'all') {
      filtered = filtered.filter((task) => task.category === this.filterCategory);
    }

    if (this.filterPriority !== 'all') {
      filtered = filtered.filter((task) => task.priority === this.filterPriority);
    }

    if (this.showCompleted) {
      filtered = filtered.filter((task) => task.status === 'completed');
    }

    return filtered;
  }

  toggleTaskComplete(id: number | undefined) {
    const task: DashboardInterface | undefined = this.tasks.find((t) => t.id === id);
    if (task) {
      if (task.status === 'completed') {
        task.status = 'pending';
        delete task.completedAt;
      } else {
        task.status = 'completed';
        task.completedAt = new Date();
      }
    }
  }

  isOverdue(task: DashboardInterface): boolean {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today && task.status !== 'completed';
  }

  deleteTask(id: number | undefined): void {
    if (id !== null && id !== undefined) {
      const index: number = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) this.tasks.splice(index, 1);
      this._service.removeData(id).subscribe(() => {});
    }
  }
}
