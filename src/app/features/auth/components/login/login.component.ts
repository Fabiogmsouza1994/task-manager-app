import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { SharedButtonComponent } from '../../../../shared/ui/shared-button/shared-button.component';
import { SharedInputFieldComponent } from '../../../../shared/ui/shared-input-field/shared-input-field.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedTitleComponent } from '../../../../shared/ui/shared-title/shared-title.component';
import { passwordStrengthValidator } from '../../../../shared/validators/password.validator';

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

  form: FormGroup = this._fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
    },
  );

  ngOnInit(): void {}

  onSubmit(): void {

  }
}