import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private baseUrl = 'https://localhost:3001/api/cats';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl
    });
  }

  async getBreeds(): Promise<any> {
    return this.axiosInstance.get('/breeds');
  }

  async getBreedById(breedId: string): Promise<any> {
    return this.axiosInstance.get(`/breeds/${breedId}`);
  }

  async searchBreeds(query: string): Promise<any> {
    return this.axiosInstance.get('/breeds/search', { params: { q: query } });
  }

  async getImagesByBreedId(breedId: string): Promise<any> {
    return this.axiosInstance.get('/image/imagesbybreedid', { params: { breed_id: breedId } });
  }
}
