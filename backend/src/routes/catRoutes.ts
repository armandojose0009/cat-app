import { Router } from 'express';
import CatController from '../controllers/CatController';
import { validateGetBreeds, validateGetBreedById, validateSearchBreeds } from '../middlewares/catMiddleware';

const router = Router();

router.get('/breeds', validateGetBreeds, CatController.getBreeds);
router.get('/breeds/:breed_id', validateGetBreedById, CatController.getBreedById);
router.get('/breeds/search', validateSearchBreeds, CatController.searchBreeds);

export default router;
