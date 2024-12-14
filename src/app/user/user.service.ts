import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_KEY = '[user]';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }
  constructor() {
    //FIXME: Use the firebase authentication
    try {
      const isUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(isUser);
    } catch (error) {
      this.user = null;
    }
  }

  login() {
    this.user = {
      id: '6dff4ec2d52643a8fc1c7b6d5a706dca',
      firstName: 'George',
      phoneNumber: '123-123-123',
      email: 'george@gmail.com',
      password: 'asdasd',
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }
}
