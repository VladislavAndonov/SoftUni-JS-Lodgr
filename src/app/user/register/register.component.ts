import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { EMAIL_DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [
      Validators.required,
      emailValidator(EMAIL_DOMAINS),
    ]),
    phoneNumber: new FormControl(''),
    passGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required]),
    },
    {
      validators: [matchPasswordsValidator('password', 'rePassword')],
    }),
  });

  isInputMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  isInputMinLength(controlName: string, minLength: number) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.[minLength]
    );
  }

  get isEmailInvalid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']
    );
  }

  get passGroup() {
    return this.form.get('passGroup');
  }

  get isPasswordMinLength() {
    return (
      this.passGroup?.get('password')?.touched &&
      this.passGroup?.get('password')?.errors?.['minlength']
    );
  }

  register() {
    console.log(this.form.value);
  }
}
