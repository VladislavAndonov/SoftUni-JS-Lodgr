import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Space } from '../../types/space';

@Component({
  selector: 'app-spaces-list',
  imports: [],
  templateUrl: './spaces-list.component.html',
  styleUrl: './spaces-list.component.css',
})
export class SpacesListComponent {
  spaces: Space[] = [
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Cozy Apartment in City Center',
      location: 'Sofia, Bulgaria',
      price: 50,
    },
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Modern Loft with Amazing View',
      location: 'Plovdiv, Bulgaria',
      price: 75,
    },
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Beachside Bungalow',
      location: 'Varna, Bulgaria',
      price: 120,
    },
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Beachside Bungalow',
      location: 'Varna, Bulgaria',
      price: 120,
    },
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Beachside Bungalow',
      location: 'Varna, Bulgaria',
      price: 120,
    },
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Beachside Bungalow',
      location: 'Varna, Bulgaria',
      price: 120,
    },
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Beachside Bungalow',
      location: 'Varna, Bulgaria',
      price: 120,
    },
    {
      image: 'https://via.placeholder.com/300x150',
      name: 'Beachside Bungalow',
      location: 'Varna, Bulgaria',
      price: 120,
    },
  ];

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getSpaces().subscribe((s) => {
      console.log(s);
    });
  }
}
