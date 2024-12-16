import { ValidationErrors, ValidatorFn } from '@angular/forms';

export function imagesValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    const value = control.value?.trim(); // Trim spaces around the input
    if (!value) {
      return null; // Don't validate if the input is empty; let "required" handle it
    }

    const urls = value.split(/\s*,\s*/); // Split on "," or ", " and trim spaces
    const isValid = urls.every((url: string) =>
      /^https?:\/\/[\w.-]+\.[a-z]{2,}([\/\w.-]*)?$/i.test(url)
    );

    return isValid ? null : { imagesValidator: true };
  };
}



