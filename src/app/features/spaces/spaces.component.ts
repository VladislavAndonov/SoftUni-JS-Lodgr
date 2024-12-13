import { Component } from '@angular/core';
import { SpacesListComponent } from './spaces-list/spaces-list.component';
import { SearchBarComponent } from '../../core/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-spaces',
  standalone: true,
  imports: [SpacesListComponent, SearchBarComponent],
  templateUrl: './spaces.component.html',
  styleUrl: './spaces.component.css'
})
export class SpacesComponent {

}
