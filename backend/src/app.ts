import express from 'express';
import catRoutes from './routes/catRoutes';
import imageRoutes from './routes/imageRoutes';
import userRoutes from './routes/userRoutes';
import Database from './config/database';

const app = express();
app.use(express.json());

app.use('/api/cats', catRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);

const startServer = async () => {
  try {
    await Database.connect();
    app.listen(3001, () => {
      console.log(`Server running on http://localhost:3001`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
  }
};

export default startServer;

