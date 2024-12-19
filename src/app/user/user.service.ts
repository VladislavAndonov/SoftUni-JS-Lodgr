import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USER_KEY = '[user]';
  user: User | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private auth: Auth) {
    // Try to load the user from localStorage
    try {
      const userJson = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(userJson);
    } catch (error) {
      this.user = null;
    }
  }

  // Register a new user with Firebase Authentication
  async register(email: string, password: string, name: string, phoneNumber: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const { uid } = userCredential.user;

    // Set user details
    this.user = {
      id: uid,
      name,
      phoneNumber,
      email,
      password,
    };

    // Persist user to localStorage
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  // Login a user
  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const { uid } = userCredential.user;

    // Fetch user details (you might fetch these from Firestore if needed)
    this.user = {
      id: uid,
      name: 'Placeholder Name', // Replace with Firestore data if implemented
      phoneNumber: '123-456-789', // Replace with Firestore data if implemented
      email : "email@gmail.com",
      password, // Not ideal for real-world apps; usually hashed on the server
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }

  // Logout the current user
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }
}
