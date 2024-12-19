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
  domains = EMAIL_DOMAINS;

  constructor(private userService: UserService, private router: Router) {}

  async login(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;

    try {
      await this.userService.login(email, password);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
