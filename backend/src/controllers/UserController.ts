import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {
  public async register(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({ message: 'Username, password, and email are required' });
      return;
    }

    try {
      const user = await userService.register(username, password, email);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.query;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      res.status(400).json({ message: 'Username and password are required and must be strings' });
      return;
    }

    try {
      const user = await userService.login(username, password);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
