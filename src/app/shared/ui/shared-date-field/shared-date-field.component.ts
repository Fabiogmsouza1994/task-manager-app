import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatePickerModule } from 'primeng/datepicker';
import { Fluid } from 'primeng/fluid';
import { SharedDateFieldConfig } from './interfaces/shared-date-field.interface';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'shared-date-field',
  imports: [ReactiveFormsModule, DatePickerModule, Fluid, InputMaskModule],
  templateUrl: './shared-date-field.component.html',
  styleUrl: './shared-date-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class SharedDateFieldComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() config!: SharedDateFieldConfig;

  formControl!: FormControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.manageFormControl();
  }

  manageFormControl(): void {
    if (this.controlContainer && this.config.fieldName) {
      const formGroup: FormGroup = this.controlContainer.control as FormGroup;
      this.formControl = formGroup.get(this.config?.fieldName) as FormControl;
    }
  }
}
