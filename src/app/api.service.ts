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

  getSpaceById(spaceId: string) {
    const docRef = doc(this.db, 'Spaces', spaceId);
    return getDoc(docRef);
  }
}