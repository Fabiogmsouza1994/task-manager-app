// shared/validators/password-match.validator.ts
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
  const password: AbstractControl | null = group.get('password');
  const confirm: AbstractControl | null = group.get('confirmPassword');

  if (!password || !confirm) return null;

  return password.value === confirm.value ? null : { passwordMismatch: true };
};

export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  if (!value) return null;

  const errors: ValidationErrors = {};

  if (value.length < 8) errors['minLength'] = { requiredLength: 8, actualLength: value.length };

  if (!/[0-9]/.test(value)) errors['number'] = true;

  if (!/[A-Z]/.test(value)) errors['uppercase'] = true;

  if (!/[^a-zA-Z0-9 ]/.test(value)) errors['specialChar'] = true;

  return Object.keys(errors).length ? errors : null;
}
