import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ImagesDirective } from '../../directives/images.directive';

@Component({
  selector: 'app-rent-space',
  standalone: true,
  imports: [FormsModule, ImagesDirective],
  templateUrl: './rent-space.component.html',
  styleUrls: ['./rent-space.component.css'],
})
export class RentSpaceComponent {
  constructor(private apiService: ApiService) {}

  // addSpaceSubmit(
  //   name: string,
  //   location: string,
  //   price: string,
  //   description: string,
  //   images: string
  // ) {
  //   const priceValue = parseFloat(price);
  //   if (isNaN(priceValue)) {
  //     throw new Error(`Invalid price input: ${price}`);
  //   }

  //   const imagesArray = images.split(',').map((img) => img.trim());

  //   const newSpace = {
  //     name,
  //     location,
  //     price: priceValue,
  //     description,
  //     images: imagesArray,
  //   };

  //   this.apiService.addSpace(newSpace);
  // }



  addSpaceSubmit(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      console.error('Form is invalid');
      return;
    }
    console.log(form.value);
    
  }
}
