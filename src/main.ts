import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from './environments/environment'
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
}).catch((err) => console.error(err));

// import { provideDatabase, getDatabase } from '@angular/fire/database'; // If using the realtime database

// provideDatabase(() => getDatabase()), // If using the realtime database