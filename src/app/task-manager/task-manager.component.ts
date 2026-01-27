import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule, MatSelectModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManager {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Assigment',
      description: 'Finish the task manager application with all requirements',
      category: 'education',
      priority: 'high',
      dueDate: new Date('2024-12-15'),
      status: 'in-progress',
      createdAt: new Date('2024-12-01'),
    },
    {
      id: 2,
      title: 'Buy Groceries',
      description: 'Milk, Bread, Eggs, Vegetables',
      category: 'shopping',
      priority: 'medium',
      dueDate: new Date('2024-12-10'),
      status: 'in-progress',
      createdAt: new Date('2024-12-05'),
    },
    {
      id: 3,
      title: 'Team Meeting',
      description: 'Discuss Q1 Project Roadmap',
      category: 'work',
      priority: 'high',
      dueDate: new Date('2024-12-08'),
      status: 'completed',
      createdAt: new Date('2024-12-08'),
    },
  ];

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
    dueDate: string | Date;
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
  showCompleted: boolean = true;

  get completionColor(): string {
    if (this.getCompletionRate() > 70) return 'green';
    if (this.getCompletionRate() > 40) return 'orange';
    return 'red';
  }

  getCompletedTasksCount(): number {
    return this.tasks.filter((task: Task) => task.status === 'completed').length;
  }

  getPendingTasksCount(): number {
    return this.tasks.filter((task: Task) => task.status === 'pending').length;
  }

  getOverdueTasksCount(): number {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    return this.tasks.filter((task: Task) => new Date(task.dueDate) < today).length;
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

    const task: Task = {
      id: Date.now(),
      title: this.newTask.title,
      description: this.newTask.description,
      category: this.newTask.category,
      priority: this.newTask.priority,
      dueDate: new Date(this.newTask.dueDate),
      status: this.newTask.status,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    this.clearForm();
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

  getFilteredTasks(): Task[] {
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

    if (!this.showCompleted) {
      filtered = filtered.filter((task) => task.status !== 'completed');
    }

    return filtered;
  }

  toggleTaskComplete(id: number) {
    const task: Task | undefined = this.tasks.find((t) => t.id === id);
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

  isOverdue(task: Task): boolean {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today && task.status !== 'completed';
  }

  deleteTask(id: number): void {
    const index: number = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
