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
import { UtilsDateFieldConfig } from './interfaces/utils-date-field.interface';
import { InputMaskModule } from 'primeng/inputmask';


@Component({
  selector: 'utils-date-field',
  imports: [ReactiveFormsModule, DatePickerModule, Fluid, InputMaskModule],
  templateUrl: './utils-date-field.component.html',
  styleUrl: './utils-date-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class UtilsDateFieldComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() config!: UtilsDateFieldConfig;

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
