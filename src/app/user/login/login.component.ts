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
  constructor(private userService: UserService, private router: Router) {}
  domains = EMAIL_DOMAINS;

  login(form: NgForm) {
    if (form.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.userService.login();
    this.router.navigate(['/']);
  }
}
