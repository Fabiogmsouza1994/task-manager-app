import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'shared-input-field',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './shared-input-field.component.html',
  styleUrl: './shared-input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class SharedInputFieldComponent implements OnInit {
  @Input() id!: string;
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() maxLength!: string;
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() textArea!: boolean;
  @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  formControl!: FormControl;
  isFocused!: boolean;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.manageFormControl();
  }

  manageFormControl(): void {
    if (this.controlContainer && this.fieldName) {
      const formGroup: FormGroup = this.controlContainer.control as FormGroup;
      this.formControl = formGroup.get(this.fieldName) as FormControl;
    }
  }

  onBlur(event: FocusEvent): void {
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.blur.emit(event);
  }
}
