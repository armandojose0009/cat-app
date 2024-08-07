import { Request, Response } from 'express';
import CatService from '../services/CatService';
import RedisClient from '../config/redis';

class CatController {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = RedisClient.getInstance();
    this.getBreeds = this.getBreeds.bind(this);
    this.getBreedById = this.getBreedById.bind(this);
    this.searchBreeds = this.searchBreeds.bind(this);
  }

  public async getBreeds(req: Request, res: Response) {
    const cacheKey = 'cat:breeds';

    try {
      const cachedBreeds = await this.redisClient.getData(cacheKey);
      if (cachedBreeds) {
        return res.json(JSON.parse(cachedBreeds));
      }
      const breeds = await CatService.getBreeds();
      
      await this.redisClient.setData(cacheKey, JSON.stringify(breeds));
      return res.json(breeds);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching breeds' });
    }
  }

  public async getBreedById(req: Request, res: Response) {
    const cacheKey = `cat:breed:${req.params.breed_id}`;

    try {
      const cachedBreed = await this.redisClient.getData(cacheKey);
      if (cachedBreed) {
        return res.json(JSON.parse(cachedBreed));
      }

      const breed = await CatService.getBreedById(req.params.breed_id);
      await this.redisClient.setData(cacheKey, JSON.stringify(breed));
      return res.json(breed);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching breed' });
    }
  }

  public async searchBreeds(req: Request, res: Response) {
    const query = req.query.q as string;
    const cacheKey = `cat:search:${query}`;

    try {
      const cachedBreeds = await this.redisClient.getData(cacheKey);
      if (cachedBreeds) {
        return res.json(JSON.parse(cachedBreeds));
      }

      const breeds = await CatService.searchBreeds(query);
      await this.redisClient.setData(cacheKey, JSON.stringify(breeds));
      return res.json(breeds);
    } catch (error) {
      return res.status(500).json({ error: 'Error searching breeds' });
    }
  }
}

export default new CatController();
