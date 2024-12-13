import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { Space } from './types/space';

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
}
