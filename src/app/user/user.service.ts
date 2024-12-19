import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersCollection = 'Users';
  currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private auth: Auth, private firestore: Firestore) {
    // Listen for auth state changes
    onAuthStateChanged(this.auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(this.firestore, this.usersCollection, firebaseUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as User;
          this.currentUserSubject.next(userData);
        } else {
          this.currentUserSubject.next(null);
        }
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  get isLogged(): boolean {
    return this.auth.currentUser !== null;
  }

  onAuthStateChanged(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(user: User, password: string): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      user.email,
      password
    );
    const uid = userCredential.user.uid;
    const userDocRef = doc(this.firestore, this.usersCollection, uid);
    await setDoc(userDocRef, user);
  }

  logout(): void {
    this.auth.signOut();
  }
}
