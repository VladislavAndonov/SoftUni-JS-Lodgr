import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Space } from '../../types/space';
import { UserService } from '../../user/user.service';
import { FormsModule } from '@angular/forms'; // Add this import
import { Router } from '@angular/router';
import { ImagesDirective } from '../../directives/images.directive';

@Component({
  selector: 'app-rent-space',
  standalone: true,
  templateUrl: './rent-space.component.html',
  styleUrls: ['./rent-space.component.css'],
  imports: [FormsModule, ImagesDirective],
})
export class RentSpaceComponent {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  async addSpaceSubmit(
    name: string,
    location: string,
    price: string,
    description: string,
    images: string
  ) {
    const user = this.userService.currentUserSubject.value;
    if (!user) {
      throw new Error('User is not logged in');
    }

    const imagesArray = images.split(',').map((img) => img.trim()); // Split and trim

    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      throw new Error(`Invalid price input: ${price}`);
    }

    const spaceData: Space = { 
      name,
      location,
      price: priceValue,
      description,
      images: imagesArray,
      ownerId: user.id,
    };

    try {
      const result = await this.apiService.addSpace('Spaces', spaceData);
      console.log('Space added successfully', result);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error adding space', error);
    }
  }
}
