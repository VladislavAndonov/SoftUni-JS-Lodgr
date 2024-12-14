import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-rent-space',
  standalone: true,
  templateUrl: './rent-space.component.html',
  styleUrls: ['./rent-space.component.css'],
})
export class RentSpaceComponent {
  constructor(private apiService: ApiService) {}

  addSpace(
    name: string,
    location: string,
    price: string,
    description: string,
    images: string
  ) {
    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      throw new Error(`Invalid price input: ${price}`);
    }

    const imagesArray = images.split(',').map((img) => img.trim());

    const newSpace = {
      name,
      location,
      price: priceValue,
      description,
      images: imagesArray,
    };

    this.apiService.addSpace(newSpace);
  }
}

// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// rentForm: FormGroup;

// constructor(private fb: FormBuilder) {
//   this.rentForm = this.fb.group({
//     name: ['', [Validators.required, Validators.minLength(3)]],
//     description: ['', [Validators.required, Validators.maxLength(500)]],
//     location: ['', Validators.required],
//     price: [0, [Validators.required, Validators.min(1)]],
//     images: [''], // Placeholder for image URLs
//     amenities: [''],
//   });
// }

// submitForm() {
//   if (this.rentForm.valid) {
//     const space: Space = this.rentForm.value;
//     console.log('Renting space:', space);
//     // Add logic to send data to the backend
//   } else {
//     console.error('Form is invalid');
//   }
// }
