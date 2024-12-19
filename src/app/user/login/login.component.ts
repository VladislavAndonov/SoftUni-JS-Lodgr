import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { EMAIL_DOMAINS } from '../../constants';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, EmailDirective],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // errorMessage: string | null = null;
  domains = EMAIL_DOMAINS;

  constructor(private userService: UserService, private router: Router) {}

  // Login user
  async login(form: NgForm) {
    if (form.invalid) {
      // this.errorMessage = 'Invalid email or password';
      return;
    }

    const { email, password } = form.value;

    try {
      await this.userService.login(email, password);
      console.log('Login successful');
      this.router.navigate(['/home']); // Redirect to home or another route
    } catch (error: any) {
      // console.error('Login error:', error);
      // this.errorMessage = error.message || 'An error occurred during login';
    }
  }
}


/* Original code

export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}
  domains = EMAIL_DOMAINS;

  login(form: NgForm) {
    if (form.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.userService.login(form.value.email, form.value.password);
    this.router.navigate(['/']);
  }
}

*/