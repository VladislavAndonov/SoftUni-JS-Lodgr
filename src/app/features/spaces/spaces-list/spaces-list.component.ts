import { Component } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Space } from '../../../types/space';

@Component({
  selector: 'app-spaces-list',
  standalone: true,
  templateUrl: './spaces-list.component.html',
  styleUrl: './spaces-list.component.css',
})
export class SpacesListComponent {
  spaces: Space[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getSpaces().subscribe((spaces: Space[]) => {
      this.spaces = spaces;
    });
  }
}