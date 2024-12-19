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
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [
      Validators.required,
      emailValidator(EMAIL_DOMAINS),
    ]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9)]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(private userService: UserService) {}

  // General validations
  isInputMissing(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['required']
    );
  }

  isInputMinLength(controlName: string) {
    return (
      this.form.get(controlName)?.touched &&
      this.form.get(controlName)?.errors?.['minlength']
    );
  }

  get isEmailInvalid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.errors?.['emailValidator']
    );
  }

  // Pass group validations
  get passGroup() {
    return this.form.get('passGroup');
  }

  get isPasswordMinLength() {
    return (
      this.passGroup?.get('password')?.touched &&
      this.passGroup?.get('password')?.errors?.['minlength']
    );
  }

  isPassMissing(controlName: string) {
    return (
      this.passGroup?.get(controlName)?.touched &&
      this.passGroup?.get(controlName)?.errors?.['required']
    );
  }

  // Register user
  async register() {
    if (this.form.invalid) {
      return;
    }

    const { name, email, phoneNumber, passGroup } = this.form.value;

    try {
      await this.userService.register(
        email as string,
        passGroup?.password as string,
        name as string,
        phoneNumber as string
      );
      console.log('Registration successful');

      //TODO: Redirect to login
    
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
}