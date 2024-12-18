import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Space } from '../../../types/space';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-spaces-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './spaces-list.component.html',
  styleUrls: ['./spaces-list.component.css'],
})
export class SpacesListComponent implements OnInit {
  spaceList: Space[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllSpaces('Spaces')
      .then(snapshot => {
        this.spaceList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Space));
      })
      .catch(error => {
        console.error('Error fetching spaces:', error);
      });
  }
}