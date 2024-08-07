import { Router } from 'express';
import { ImageController } from '../controllers/ImageController';
import { validateGetImagesByBreedId } from '../middlewares/imageMiddleware';

const router = Router();
const imageController = new ImageController();

router.get('/imagesbybreedid', validateGetImagesByBreedId, imageController.getImagesByBreedId);

export default router;
