import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SharedInputFieldComponent } from '../../../shared/ui/shared-input-field/shared-input-field.component';
import { SharedButtonComponent } from '../../../shared/ui/shared-button/shared-button.component';
import { AuthService } from '../../../core/services/auth.service';
import {
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../../../shared/validators/password.validator';
import { PASSWORD_SPECIAL_CHAR_REGEX } from '../../../shared/validators/password.pattern';
import { SharedTitleComponent } from '../../../shared/ui/shared-title/shared-title';

@Component({
  selector: 'features-register',
  imports: [
    SharedTitleComponent,
    ReactiveFormsModule,
    SharedInputFieldComponent,
    SharedButtonComponent,
  ],
  providers: [AuthService],
  templateUrl: 'register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);

  isSubmitted!: boolean;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password: AbstractControl | null = control.get('password');
    const confirmPassword: AbstractControl | null = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({
        ...confirmPassword.errors,
        passwordMismatch: true,
      });

      return { passwordMismatch: true };
    }

    if (confirmPassword.errors) {
      const { passwordMismatch, ...errors } = confirmPassword.errors;
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };

  form: FormGroup = this._fb.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid)
      this._authService.createUser(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => console.log('error', err),
      });
  }

  hasDisplayedError(controlName: string): Boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}
