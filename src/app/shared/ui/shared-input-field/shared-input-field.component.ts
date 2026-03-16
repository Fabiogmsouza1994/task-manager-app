import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
  WritableSignal,
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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'shared-input-field',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
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
  @Input() type: 'text' | 'number' | 'password' = 'text';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() textArea!: boolean;
  @Input() exibirMsgValidacao: boolean = true;
  @Input() exibirMsgCampoObrigatorio!: boolean;
  @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  formControl!: FormControl;
  isFocused!: boolean;
  msgValidacao: WritableSignal<string | null> = signal(null);
  focado!: boolean;
  hidePassword: WritableSignal<boolean> = signal(true);
  passwordType: Signal<string> = computed(() => (this.hidePassword() ? 'password' : 'text'));
  passwordIconVisibility: Signal<string> = computed(() =>
    this.hidePassword() ? 'visibility_off' : 'visibility',
  );

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.manageFormControl();
  }

  togglePassword(): void {
    this.hidePassword.update((hidden: boolean) => !hidden);
  }

  manageFormControl(): void {
    if (this.controlContainer && this.fieldName) {
      const formGroup: FormGroup = this.controlContainer.control as FormGroup;
      this.formControl = formGroup.get(this.fieldName) as FormControl;
    }
  }

  definirMsgValidacao(): boolean {
    if (this.formControl?.hasError('required') && !this.focado && this.exibirMsgCampoObrigatorio) {
      this.msgValidacao.set('Campo obrigatório.');
      return true;
    }

    if (this.type === 'password') {
      if (this.formControl?.hasError('minLength')) {
        this.msgValidacao.set('Insira no mínimo 8 caracteres.');
        return true;
      } else if (this.formControl?.hasError('uppercase')) {
        this.msgValidacao.set('Insira ao menos uma letra maiúscula.');
        return true;
      } else if (this.formControl?.hasError('number')) {
        this.msgValidacao.set('Insira ao menos um número.');
        return true;
      } else if (this.formControl?.hasError('specialChar')) {
        this.msgValidacao.set('Insira ao menos um caracter especial.');
        return true;
      }
    } else if (this.formControl?.hasError('min')) {
      this.msgValidacao.set(
        `Insira um valor maior ou igual a ${this.formControl.errors?.['min'].min}.`,
      );
      return true;
    } else if (this.formControl?.hasError('max')) {
      this.msgValidacao.set(
        `Insira um valor no máximo igual a ${this.formControl.errors?.['max'].max}.`,
      );
      return true;
    }

    return false;
  }

  onBlur(event: FocusEvent): void {
    this.focado = false;
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent): void {
    this.focado = true;
    this.blur.emit(event);
  }
}
