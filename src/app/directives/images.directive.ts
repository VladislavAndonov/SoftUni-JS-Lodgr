import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { imagesValidator } from '../utils/images.validator';

@Directive({
  selector: '[appImages]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ImagesDirective,
      multi: true,
    },
  ],
})
export class ImagesDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return imagesValidator()(control);
  }
}