import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-breed-selector',
  templateUrl: './breed-selector.component.html',
  styleUrls: ['./breed-selector.component.css']
})
export class BreedSelectorComponent implements OnInit {
  breeds: any[] = [];
  selectedBreed: any = null;

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.catService.getBreeds().subscribe((data: any) => {
      this.breeds = data;
    });
  }

  onSelectBreed(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const breedId = target.value;
    this.catService.getBreedById(breedId).subscribe((data: any) => {
      this.selectedBreed = data;
    });
  }

}
