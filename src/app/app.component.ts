import { Component } from '@angular/core';
// import { Database, ref, get } from '@angular/fire/database';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from './core/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lodgr';

  // constructor(private db: Database) {}

  // ngOnInit(): void {
  //   const spacesRef = ref(this.db, 'spaces');
  //   get(spacesRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log('Spaces Data:', snapshot.val());
  //       } else {
  //         console.log('No data available.');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }
}