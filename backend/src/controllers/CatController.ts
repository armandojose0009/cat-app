import { Request, Response } from 'express';
import CatService from '../services/CatService';

class CatController {
  async getBreeds(req: Request, res: Response) {
    try {
      const breeds = await CatService.getBreeds();
      
      res.json(breeds);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching breeds' });
    }
  }

  async getBreedById(req: Request, res: Response) {
    try {
      const breed = await CatService.getBreedById(req.params.breed_id);
      res.json(breed);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching breed' });
    }
  }

  async searchBreeds(req: Request, res: Response) {
    try {
      const breeds = await CatService.searchBreeds(req.query.q as string);
      res.json(breeds);
    } catch (error) {
      res.status(500).json({ error: 'Error searching breeds' });
    }
  }
}

export default new CatController();
