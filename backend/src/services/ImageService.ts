import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export class ImageService {
  private apiKey = process.env.API_KEY;

  public async getImagesByBreedId(breedId: string): Promise<any> {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
      headers: { 'x-api-key': this.apiKey }
    });
    return response.data;
  }
}
