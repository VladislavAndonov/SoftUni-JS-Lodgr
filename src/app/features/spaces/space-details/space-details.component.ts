import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Space } from '../../../types/space';

@Component({
  selector: 'app-space-details',
  standalone: true,
  templateUrl: './space-details.component.html',
  styleUrls: ['./space-details.component.css'],
})
export class SpaceDetailsComponent implements OnInit {
  private spaceId: string | null = null;
  public spaceData = {} as Space;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.spaceId = this.route.snapshot.paramMap.get('id');

    if (this.spaceId) {
      this.apiService
        .getOneSpace('Spaces', this.spaceId)
        .then((doc) => {
          if (doc.exists()) {
            this.spaceData = {
              ...doc.data(),
              id: doc.id,
            } as Space;
          } else {
            console.error('No such document exists!');
          }
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  }
}
