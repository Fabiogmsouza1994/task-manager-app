import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedInputFieldComponent } from '../../../../shared/ui/shared-input-field/shared-input-field.component';
import { SharedButtonComponent } from '../../../../shared/ui/shared-button/shared-button.component';
import { AuthService } from '../../../../core/services/auth.service';
import {
  passwordMatchValidator,
  passwordStrengthValidator,
} from '../../../../shared/validators/password.validator';
import { SharedTitleComponent } from '../../../../shared/ui/shared-title/shared-title.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
export class RegisterComponent implements OnInit {
  private _fb: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _toastr: ToastrService = inject(ToastrService);

  isSubmitted!: boolean;

  form: FormGroup = this._fb.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) this._router.navigateByUrl('/dashboard');
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid)
      this._authService.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
          }
        },
        error: (err) => {
          if (err.error.errors) {
            err.res.error.errors.forEach((x: any) => {
              switch (x.code) {
                case 'DuplicateUserName':
                  break;

                case 'DuplicateEmail':
                  this._toastr.error('Email is already taken.', 'Registration failed');
                  break;

                default:
                  this._toastr.error('Contact the developer', 'Registration failed');
              }
            });
          } else console.log('error', err);
        },
      });
  }

  hasDisplayedError(controlName: string): Boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}
