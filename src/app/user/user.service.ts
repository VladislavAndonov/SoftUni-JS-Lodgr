import { Injectable } from '@angular/core';
import { Auth, User as FirebaseUser } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from '@firebase/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersCollection = 'Users';
  private currentUserData: User | null = null;

  constructor(private auth: Auth, private firestore: Firestore) {
    // Listen for auth state changes
    onAuthStateChanged(this.auth, async (firebaseUser) => {
      if (firebaseUser) {
        this.currentUserData = await this.fetchUserData(firebaseUser.uid);
      } else {
        this.currentUserData = null;
      }
    });
  }

  // Check if the user is logged in
  get isLogged(): boolean {
    return !!this.auth.currentUser;
  }

  // Get current user's data
  get currentUser(): User | null {
    return this.currentUserData;
  }

  // Fetch user data from Firestore by ID
  private async fetchUserData(uid: string): Promise<User | null> {
    const userDocRef = doc(this.firestore, this.usersCollection, uid);
    const userSnapshot = await getDoc(userDocRef);
    return userSnapshot.exists() ? { ...userSnapshot.data(), id: uid } as User : null;
  }

  // Login
  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;

    // Fetch user data from Firestore
    this.currentUserData = await this.fetchUserData(uid);
  }

  // Register
  async register(user: User, password: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, password);
    const uid = userCredential.user.uid;

    // Save user data in Firestore
    const userDocRef = doc(this.firestore, this.usersCollection, uid);
    await setDoc(userDocRef, {
      id: uid,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      spaces: user.spaces || [],
    });

    // Fetch and store user data locally
    this.currentUserData = await this.fetchUserData(uid);
  }

  // Logout
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.currentUserData = null;
  }
}
