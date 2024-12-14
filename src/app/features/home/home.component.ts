import { Component } from '@angular/core';
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
export class HomeComponent {
  featuredSpaces: Space[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() : void {
    this.apiService.getSpaces().subscribe((spaces: Space[]) => {
      this.featuredSpaces = Object.entries(spaces).slice(0, 4).map(([key, value]) => value);
    });
  }
}