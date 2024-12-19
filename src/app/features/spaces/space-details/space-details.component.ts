import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Space } from '../../../types/space';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-space-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.css'],
})
export class SpaceDetailsComponent implements OnInit {
  private spaceId: string | null = null;
  public space = {} as Space;
  public isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spaceId = this.route.snapshot.paramMap.get('id');

    if (this.spaceId) {
      this.apiService
        .getOneSpace('Spaces', this.spaceId)
        .then((doc) => {
          if (doc.exists()) {
            this.space = {
              ...doc.data(),
              id: doc.id,
            } as Space;

            // Check if the current user is the owner
            const currentUser = this.userService.currentUserSubject.value;
            this.isOwner = currentUser?.id === this.space.ownerId;
          } else {
            console.error('No such document exists!');
          }
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  }

  async deleteSpace(): Promise<void> {
    if (confirm('Are you sure you want to delete this space?')) {
      try {
        if (this.spaceId) {
          await this.apiService.deleteSpace('Spaces', this.spaceId);
          this.router.navigate(['/spaces']);
        }
      } catch (error) {
        console.error('Error deleting space:', error);
      }
    }
  }
}

