import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Space } from '../../types/space';
import { SearchBarComponent } from '../../core/shared/search-bar/search-bar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredSpaces: Space[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFeaturedSpaces();
  }

  async loadFeaturedSpaces() {
    try {
      const snapshot = await this.apiService.getAllSpaces('Spaces');
      this.featuredSpaces = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Space[];
    } catch (error) {
      console.error('Error fetching spaces:', error);
    }
  }
}
