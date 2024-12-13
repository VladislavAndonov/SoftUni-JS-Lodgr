import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Space } from '../../../types/space';

@Component({
  selector: 'app-space-details',
  standalone: true,
  templateUrl: './space-details.component.html',
  styleUrl: './space-details.component.css',
})
export class SpaceDetailsComponent implements OnInit {
  space : Space = {} as Space;
  
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const spaceId = this.route.snapshot.paramMap.get('id');
    if (spaceId) {
      this.apiService.getOneSpace(spaceId).subscribe((space : Space) => {
        this.space = space;
      });
    }
  }
}

