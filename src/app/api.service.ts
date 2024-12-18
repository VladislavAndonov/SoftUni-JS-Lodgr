import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: Firestore) {}

  addSpace(collectionName: string, data: any) {
    const collectionRef = collection(this.db, collectionName);
    return addDoc(collectionRef, data);
  }

  getAllSpaces(collectionName: string) {
    const collectionRef = collection(this.db, collectionName);
    return getDocs(collectionRef);
  }

  getOneSpace(collectionName: string, spaceId: string) {
    const docRef = doc(this.db, collectionName, spaceId);
    return getDoc(docRef);
  }
}

/* If using the realtime database 

// import { Database, ref, get, child } from '@angular/fire/database';
// import { push, set } from 'firebase/database';

// import { Observable } from 'rxjs';
// import { from } from 'rxjs';

// import { Space } from './types/space';



constructor(private db: Database) {}
  getSpaces(): Observable<Space[]> {
    const spacesReference = child(ref(this.db), 'spaces');

    return from(get(spacesReference).then((snapshot) => snapshot.val()));
  }

  getOneSpace(id: string): Observable<Space> {
    const spaceReference = child(ref(this.db), `spaces/${id}`);

    return from(get(spaceReference).then((snapshot) => snapshot.val()));
  }

  addSpace(space: Omit<Space, 'id'>): void {
    const spacesRef = ref(this.db, 'spaces');
    const newSpaceRef = push(spacesRef); 
    const id = newSpaceRef.key;

    if (id) {
      const completeSpace: Space = { ...space, id };
      set(newSpaceRef, completeSpace); 
    } else {
      throw new Error('Failed to generate ID');
    }
  }

*/
