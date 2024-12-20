import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
} from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { Space } from './types/space';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: Firestore) {}

  addSpace(collectionName: string, data: Space) {
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

  updateSpace(collectionName: string, spaceId: string, data: Partial<Space>) {
    const docRef = doc(this.db, collectionName, spaceId);
    return setDoc(docRef, data, { merge: true });
  }

  deleteSpace(collectionName: string, spaceId: string) {
    const docRef = doc(this.db, collectionName, spaceId);
    return deleteDoc(docRef);
  }
}
