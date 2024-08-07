import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateRegister, validateLogin } from '../middlewares/userMiddleware';

const router = Router();
const userController = new UserController();

router.post('/register', validateRegister, userController.register);
router.get('/login', validateLogin, userController.login);

export default router;
