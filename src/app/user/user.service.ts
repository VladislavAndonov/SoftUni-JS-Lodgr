import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from '../types/user';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersCollection = 'Users';

  constructor(private auth: Auth, private firestore: Firestore) {}

  // Check if user is logged in
  get isLogged(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  // Get logged-in user data
  get currentUser(): User | null {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Login
  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;
    const token = await userCredential.user.getIdToken();

    // Fetch user data from Firestore
    const userDocRef = doc(this.firestore, this.usersCollection, uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as Omit<User, 'password'>;

      // Store token and user data in sessionStorage
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userData', JSON.stringify(userData));
    } else {
      throw new Error('User not found in database');
    }
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
  }

  // Register
  async register(user: User, password: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, password);
    const uid = userCredential.user.uid;
    const token = await userCredential.user.getIdToken();

    // Save user data in Firestore
    const userDocRef = doc(this.firestore, this.usersCollection, uid);
    await setDoc(userDocRef, {
      id: uid,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });

    // Store token and user data in sessionStorage
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem(
      'userData',
      JSON.stringify({ id: uid, name: user.name, email: user.email, phoneNumber: user.phoneNumber })
    );
  }
}