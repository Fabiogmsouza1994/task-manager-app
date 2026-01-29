import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Injector,
  OnInit,
  runInInjectionContext,
  Signal,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { DashboardService } from './services/dashboard.service';
import { InputFieldComponent } from '../utils/input-field/input-field.component';
import { DropdownFieldComponent } from '../utils/dropdown-field/dropdown-field.component';
import { UtilsButtonComponent } from '../utils/utils-button/utils-button.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'dashboard-page',
  imports: [
    InputFieldComponent,
    DropdownFieldComponent,
    UtilsButtonComponent,
    CommonModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly _service: DashboardService,
    private readonly _alertService: AlertService,
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private _injector: Injector,
  ) {
    this.form = this._fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      description: ['', Validators.required],
      filterStatus: ['all'],
      filterCategories: ['all'],
      filterPriorities: ['all'],
      showCompletedTasks: [''],
    });
    this.tasks = this._route.snapshot.data['todos'].data;
  }

  form!: FormGroup;
  tasks: DashboardInterface[] = [];

  isAddDisabled$!: Observable<boolean>;

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
    dueDate: Date | null;
    status: string;
  } = {
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: null,
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

  ngOnInit(): void {
    this.isAddDisabled$ = this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      map(({ title, category, dueDate }) => !title?.trim() || !category || !dueDate),
    );
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
    return this.tasks.filter((task: DashboardInterface) => new Date(task?.dueDate) < today).length;
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

  addTask(): void {
    const task: DashboardInterface = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      category: this.form.get('category')?.value,
      priority: this.form.get('priority')?.value,
      dueDate: new Date(this.form.get('dueDate')?.value),
      status: this.form.get('status')?.value,
    };

    this.tasks.push(task);
    this._service.addData(task).subscribe(() => {});
    this.clearForm();
  }

  clearForm(): void {
    this.newTask = {
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: null,
      status: 'pending',
    };
  }

  getFilteredTasks(): DashboardInterface[] {
    let filtered: DashboardInterface[] = [...this.tasks];

    if (this.form.get('filterStatus')?.value !== 'all')
      filtered = filtered.filter((task: DashboardInterface) => task.status === this.filterStatus);

    if (this.form.get('filterCategories')?.value !== 'all')
      filtered = filtered.filter(
        (task: DashboardInterface) => task.category === this.filterCategory,
      );

    if (this.form.get('filterPriorities')?.value !== 'all')
      filtered = filtered.filter(
        (task: DashboardInterface) => task.priority === this.filterPriority,
      );

    if (this.showCompleted)
      filtered = filtered.filter((task: DashboardInterface) => task.status === 'completed');

    return filtered;
  }

  toggleTaskComplete(id: number | undefined) {
    const task: DashboardInterface | undefined = this.tasks.find(
      (task: DashboardInterface) => task.id === id,
    );

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
      const index: number = this.tasks.findIndex((task: DashboardInterface) => task.id === id);
      if (index !== -1) this.tasks.splice(index, 1);
      this._service.removeData(id).subscribe(() => {});
    }
  }
}
