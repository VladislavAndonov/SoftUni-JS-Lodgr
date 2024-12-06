import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: Database) {}

  getSpaces(): Observable<any> {
    const dbRef = ref(this.db);
    const spacesRef = child(dbRef, 'spaces'); // Adjust the path to match your database structure

    // Wrap the promise from Firebase in an Observable
    return from(get(spacesRef).then((snapshot) => snapshot.val()));
  }
}