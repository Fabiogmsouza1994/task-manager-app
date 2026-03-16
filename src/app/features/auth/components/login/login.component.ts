import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { SharedButtonComponent } from '../../../../shared/ui/shared-button/shared-button.component';
import { SharedInputFieldComponent } from '../../../../shared/ui/shared-input-field/shared-input-field.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedTitleComponent } from '../../../../shared/ui/shared-title/shared-title.component';
import { passwordStrengthValidator } from '../../../../shared/validators/password.validator';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ThemeProvider } from 'primeng/config';
import { TokenAuthEnum } from '../../../../core/enums/token-auth.enum';

@Component({
  selector: 'features-login',
  imports: [
    ReactiveFormsModule,
    SharedTitleComponent,
    SharedButtonComponent,
    SharedInputFieldComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private _fb: FormBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isSubmitted!: boolean;

  form: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordStrengthValidator]],
  });

  ngOnInit(): void {
    if(this._authService.isLoggedIn())
      this._router.navigateByUrl('/dashboard');
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this._authService.signIn(this.form.value).subscribe({
        next: (res: any) => {
         this._authService.saveToken(res.token);
         this._router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          if(err.status == 400)
            console.log(err);
        },
      });
    }
  }
}
