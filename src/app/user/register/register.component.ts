import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { EMAIL_DOMAINS } from '../../constants';
import { matchPasswordsValidator } from '../../utils/match-passwords.validator';
import { UserService } from '../user.service';
import { User } from '../../types/user';

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
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
    ]),
    passGroup: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        rePassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(private userService: UserService, private router: Router) {}

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

  async register() {
    if (this.form.invalid) return;

    const { name, email, phoneNumber, passGroup } = this.form.value;
    const password = passGroup?.password!;

    try {
      await this.userService.register(
        { id: '', name, email, phoneNumber } as User, // Firebase will assign the ID
        password
      );
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }
}
