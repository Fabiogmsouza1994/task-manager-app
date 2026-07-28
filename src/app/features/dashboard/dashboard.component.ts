import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { map, Observable, startWith } from 'rxjs';
import { SharedDropdownFieldComponent } from '../../shared/ui/shared-dropdown-field/shared-dropdown-field.component';
import { SharedDateFieldComponent } from '../../shared/ui/shared-date-field/shared-date-field.component';
import { SharedInputFieldComponent } from '../../shared/ui/shared-input-field/shared-input-field.component';
import { SharedButtonComponent } from '../../shared/ui/shared-button/shared-button.component';
import { SharedCardComponent } from '../../shared/ui/shared-card/shared-card.component';
import { SharedDateFieldConfig } from '../../shared/ui/shared-date-field/interfaces/shared-date-field.interface';
import { ApiResponsesModel } from '../../models/apis-responses.model';
import { UserService } from '../../core/services/user.service';
@Component({
  selector: 'dashboard-page',
  imports: [
    SharedInputFieldComponent,
    SharedDropdownFieldComponent,
    SharedDateFieldComponent,
    SharedButtonComponent,
    SharedCardComponent,
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
    private readonly _route: ActivatedRoute,
    private readonly _fb: FormBuilder,
    private readonly _userService: UserService,
    private readonly _cdr: ChangeDetectorRef,
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
  someFilterNotAll$!: Observable<boolean>;
  fullName: string = '';

  dueDateConfig: SharedDateFieldConfig = {
    id: 'dueDate',
    label: 'Due date',
    fieldName: 'dueDate',
    keepInvalid: false,
  };

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

  showCompleted: boolean = false;

  get completionColor(): string {
    if (this.getCompletionRate() > 70) return 'green';
    if (this.getCompletionRate() > 40) return 'orange';
    return 'red';
  }

  ngOnInit(): void {
    this._userService.getUserProfile().subscribe({
      next: (res: any) => (this.fullName = res.fullName),
      error: (err: any) => {},
    });
    this.isAddDisabled$ = this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      map(({ title, category, dueDate }) => !title?.trim() || !category || !dueDate),
    );

    this.someFilterNotAll$ = this.form.valueChanges.pipe(
      startWith(this.form.getRawValue()),
      map(
        ({ filterStatus, filterCategories, filterPriorities }) =>
          !filterStatus || !filterCategories || !filterPriorities,
      ),
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
      status: this.form.get('status')?.value || 'pending',
    };

    this._service.addData(task).subscribe((resp: ApiResponsesModel<DashboardInterface>) => {
      if (resp?.success && resp?.data) {
        this.tasks = [...this.tasks, resp.data];
        this._cdr.markForCheck();
      }
    });
    this.clearForm();
  }

  clearForm(): void {
    this.form.patchValue({
      title: '',
      description: '',
      category: '',
      priority: '',
      status: '',
      dueDate: '',
    });
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  getFilteredTasks(): DashboardInterface[] {
    let filtered: DashboardInterface[] = [...this.tasks];
    const filterStatus: string = this.form.get('filterStatus')?.value;
    const filterCategories: string = this.form.get('filterCategories')?.value;
    const filterPriorities: string = this.form.get('filterPriorities')?.value;

    if (filterStatus !== 'all')
      filtered = filtered.filter((task: DashboardInterface) => task.status === filterStatus);

    if (filterCategories !== 'all')
      filtered = filtered.filter((task: DashboardInterface) => task.category === filterCategories);

    if (filterPriorities !== 'all')
      filtered = filtered.filter((task: DashboardInterface) => task.priority === filterPriorities);

    if (this.showCompleted)
      filtered = filtered.filter((task: DashboardInterface) => task.status === 'completed');

    return filtered;
  }

  toggleTaskComplete(id: number | undefined): void {
    const target: DashboardInterface | undefined = this.tasks.find(
      (task: DashboardInterface) => task.id === id,
    );
    if (!target || target.id === undefined) return;

    const { completedAt, ...taskWithoutCompletedAt } = target;

    const updated: DashboardInterface =
      target.status === 'completed'
        ? { ...taskWithoutCompletedAt, status: 'pending' }
        : { ...target, status: 'completed', completedAt: new Date() };

    this._service
      .updateData(target.id, updated)
      .subscribe((resp: ApiResponsesModel<DashboardInterface>) => {
        console.log(resp);
        if (resp?.success) {
          this.tasks = this.tasks.map((task: DashboardInterface) =>
            task.id === id ? updated : task,
          );
          this._cdr.markForCheck();
        }
      });
  }

  isOverdue(task: DashboardInterface): boolean {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today && task.status !== 'completed';
  }

  deleteTask(id: number | undefined): void {
    if (id !== null && id !== undefined) {
      this.tasks = this.tasks.filter((task: DashboardInterface) => task.id !== id);
      this._service.removeData(id).subscribe(() => {});
    }
  }
}
