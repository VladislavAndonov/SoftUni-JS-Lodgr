import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Space } from './types/space';
import { push, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: Database) {}
  getSpaces(): Observable<Space[]> {
    const spacesReference = child(ref(this.db), 'spaces');

    return from(get(spacesReference).then((snapshot) => snapshot.val()));
  }

  getOneSpace(id: string): Observable<Space> {
    const spaceReference = child(ref(this.db), `spaces/${id}`);

    return from(get(spaceReference).then((snapshot) => snapshot.val()));
  }
  // addSpace(space: Space) {
  //   const spacesReference = ref(this.db, 'spaces');
  //   const payload = {space};
  //   return from(set(spacesReference, payload));
  // }

  addSpace(space: Omit<Space, 'id'>): void {
    const spacesRef = ref(this.db, 'spaces');
    const newSpaceRef = push(spacesRef); // Firebase generates a unique key
    const id = newSpaceRef.key; // Retrieve the generated key

    if (id) {
      const completeSpace: Space = { ...space, id };
      set(newSpaceRef, completeSpace); // Save the complete object with the ID
    } else {
      throw new Error('Failed to generate ID');
    }
  }
}
