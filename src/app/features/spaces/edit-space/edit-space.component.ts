import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Space } from '../../../types/space';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-edit-space',
  standalone: true,
  templateUrl: './edit-space.component.html',
  styleUrls: ['./edit-space.component.css'],
  imports: [FormsModule],
})
export class EditSpaceComponent implements OnInit {
  public space = {} as Space;
  private spaceId: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spaceId = this.route.snapshot.paramMap.get('id');

    if (this.spaceId) {
      this.apiService.getOneSpace('Spaces', this.spaceId).then((doc) => {
        if (doc.exists()) {
          this.space = {
            ...doc.data(),
            id: doc.id,
          } as Space;

          // Ensure only the owner can edit
          const currentUser = this.userService.currentUserSubject.value;
          if (currentUser?.id !== this.space.ownerId) {
            alert('You are not authorized to edit this space!');
            this.router.navigate(['/']); // Redirect if unauthorized
          }
        } else {
          console.error('No such document exists!');
          this.router.navigate(['/']); // Redirect if document doesn't exist
        }
      });
    }
  }

  async editSpaceSubmit(): Promise<void> {
    if (this.spaceId) {
      try {
        await this.apiService.updateSpace('Spaces', this.spaceId, this.space);
        console.log('Space updated successfully!');
        this.router.navigate(['/spaces', this.spaceId]); // Redirect to the space details page
      } catch (error) {
        console.error('Error updating space:', error);
      }
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/spaces', this.spaceId]);
  }
}
