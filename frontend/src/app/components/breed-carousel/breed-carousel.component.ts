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

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.catService.getImagesByBreedId(this.breed.id).subscribe((data: any) => {
      this.images = data;
    });
  }
}
