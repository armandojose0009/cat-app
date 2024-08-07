import { Component, Input, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-breed-carousel',
  templateUrl: './breed-carousel.component.html',
  styleUrls: ['./breed-carousel.component.css']
})
export class BreedCarouselComponent implements OnInit {
  @Input() breed: any;
  images: any[] = [];

  constructor(private catService: CatService) {}

  async ngOnInit(): Promise<void> {
    if (this.breed && this.breed.id) {
      try {
        const response = await this.catService.getImagesByBreedId(this.breed.id);
        this.images = response.data;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }
  }
}
