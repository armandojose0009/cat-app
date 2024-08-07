import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-breed-table',
  templateUrl: './breed-table.component.html',
  styleUrls: ['./breed-table.component.css']
})
export class BreedTableComponent implements OnInit {
  breeds: any[] = [];
  filteredBreeds: any[] = [];
  searchQuery: string = '';

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.catService.getBreeds().subscribe((data: any) => {
      this.breeds = data;
      this.filteredBreeds = data;
    });
  }

  onSearch(): void {
    this.filteredBreeds = this.breeds.filter(breed => breed.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
