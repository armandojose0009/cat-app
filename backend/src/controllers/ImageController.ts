import { Request, Response } from 'express';
import { ImageService } from '../services/ImageService';

const imageService = new ImageService();

export class ImageController {
  
  public async getImagesByBreedId(req: Request, res: Response): Promise<void> {
    const { breed_id } = req.query;

    if (!breed_id || typeof breed_id !== 'string') {
      res.status(400).json({ message: 'Breed ID is required and must be a string' });
      return;
    }

    try {
      const images = await imageService.getImagesByBreedId(breed_id);
      res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching images by breed ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
