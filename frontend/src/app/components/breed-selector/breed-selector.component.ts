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

  constructor(private catService: CatService) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.catService.getBreeds();
      this.breeds = response.data;
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  }

  async onSelectBreed(breedId: string): Promise<void> {
    try {
      const response = await this.catService.getBreedById(breedId);
      this.selectedBreed = response.data;
    } catch (error) {
      console.error('Error fetching breed details:', error);
    }
  }
}
