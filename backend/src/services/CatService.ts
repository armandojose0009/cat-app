import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();



class CatService {
  private apiKey = process.env.API_KEY;
  private apiBreeds = `https://api.thecatapi.com/v1/breeds`;
  async getBreeds() {
    const response = await axios.get(this.apiBreeds, {
      headers: { 'x-api-key': this.apiKey }
    });
    return response.data;
  }

  async getBreedById(breedId: string) {
    const response = await axios.get(`${this.apiBreeds}/${breedId}`, {
      headers: { 'x-api-key': this.apiKey }
    });
    return response.data;
  }

  async searchBreeds(query: string) {
    const response = await axios.get(`${this.apiBreeds}/search?q=${query}`, {
      headers: { 'x-api-key': this.apiKey }
    });
    return response.data;
  }
}

export default new CatService();
