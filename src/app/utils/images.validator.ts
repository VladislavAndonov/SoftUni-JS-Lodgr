import { ValidationErrors, ValidatorFn } from '@angular/forms';

export function imagesValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) {
      return null;
    }

    const urls = value.split(/\s*,\s*/);
    const isValid = urls.every((url: string) =>
      /^(https?:\/\/[^\s,]+)$/.test(url)
    );

    return isValid ? null : { imagesValidator: true };
  };
}