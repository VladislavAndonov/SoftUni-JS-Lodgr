import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private authSubscription?: Subscription;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.userService.onAuthStateChanged().subscribe((user) => {
      this.currentUser = user;
    });
  }

  onLogout(): void {
    this.userService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
