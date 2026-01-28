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

@Component({
  selector: 'input-field',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputField implements OnInit {
  @Input() id!: string;
  @Input() type!: 'text' | 'number';
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() maxLength!: string;
  @Input() placeholder: string = '';
  @Input() name: string = '';
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
