import { Component } from '@angular/core';
import { SpacesListComponent } from '../spaces/spaces-list/spaces-list.component';
import { SearchBarComponent } from '../spaces/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SpacesListComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
