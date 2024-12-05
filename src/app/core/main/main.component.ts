import { Component } from '@angular/core';
import { SpacesListComponent } from '../spaces-list/spaces-list.component';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-main',
  imports: [SpacesListComponent, SearchBarComponent, SearchBarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
