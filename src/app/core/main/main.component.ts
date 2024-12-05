import { Component } from '@angular/core';
import { SpacesListComponent } from '../spaces-list/spaces-list.component';

@Component({
  selector: 'app-main',
  imports: [SpacesListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
