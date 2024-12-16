import { ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(allowedDomains: string[]): ValidatorFn {
  const domainsPattern = allowedDomains.join('|');
  const emailPattern = new RegExp(`^[a-zA-Z0-9._+-]{5,}@(${domainsPattern})$`);

  return (control): ValidationErrors | null => {
    const email = control.value;
    const isEmailValid = email === '' || emailPattern.test(email);
    return isEmailValid ? null : { emailValidator: true };
  };
}
