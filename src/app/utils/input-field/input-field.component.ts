import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [],
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
export class InputField { 

    @Input() id!: string;
  @Input() type!: 'text' | 'number';
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() maxLength!: string;
  
  formControl!: FormControl;
  isFocused!: boolean;
}
