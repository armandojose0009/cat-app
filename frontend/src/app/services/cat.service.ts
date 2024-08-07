import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private baseUrl = 'https://localhost:3001/api/cats';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<any> {
    return this.http.get(`${this.baseUrl}/breeds`);
  }

  getBreedById(breedId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/breeds/${breedId}`);
  }

  searchBreeds(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/breeds/search`, { params: { q: query } });
  }

  getImagesByBreedId(breedId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/image/imagesbybreedid`, { params: { breed_id: breedId } });
  }
}
