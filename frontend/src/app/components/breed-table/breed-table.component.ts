import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-breed-table',
  templateUrl: './breed-table.component.html',
  styleUrls: ['./breed-table.component.css']
})
export class BreedTableComponent implements OnInit {
  breeds: any[] = [];
  filteredBreeds: any[] = [];
  searchForm: FormGroup;

  displayedColumns: string[] = ['name', 'origin', 'description'];

  constructor(private catService: CatService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.catService.getBreeds();
      this.breeds = response.data; // Assuming response contains data
      this.filteredBreeds = this.breeds;
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  }

  onSearch(): void {
    const query = this.searchForm.get('searchQuery')?.value;
    this.filteredBreeds = this.breeds.filter(breed => breed.name.toLowerCase().includes(query.toLowerCase()));
  }
}
