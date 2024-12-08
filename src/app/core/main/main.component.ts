import { Component } from '@angular/core';
import { SearchBarComponent } from '../../features/spaces/search-bar/search-bar.component';
import { SpacesListComponent } from '../../features/spaces/spaces-list/spaces-list.component';

@Component({
  selector: 'app-main',
  imports: [SpacesListComponent, SearchBarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
