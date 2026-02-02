import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedInputFieldComponent } from '../../../shared/ui/shared-input-field/shared-input-field.component';
import { SharedButtonComponent } from '../../../shared/ui/shared-button/shared-button.component';

@Component({
  selector: 'features-register',
  imports: [ReactiveFormsModule, SharedInputFieldComponent, SharedButtonComponent],
  templateUrl: 'register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      fullName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  form: FormGroup;
}
