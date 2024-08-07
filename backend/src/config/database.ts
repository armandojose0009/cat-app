import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

interface MongoDbSettings {
  host: string;
  port: number;
  database: string;
}

class Database {
  private static mongoDbSettings: MongoDbSettings = {
    host: process.env.HOSTMONGO || '',
    port: parseInt(process.env.PORTMONGO || '', 10),
    database: process.env.DATABASEMONGO || '',
  };

  private static mongoUri = `mongodb://${Database.mongoDbSettings.host}:${Database.mongoDbSettings.port}/${Database.mongoDbSettings.database}`;

  public static isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  public static async connect(): Promise<Mongoose> {
    try {
      await mongoose.connect(Database.mongoUri);
      console.info('Connected to MongoDB successfully');
      return mongoose;
    } catch (e) {
      console.error('Error connecting to MongoDB:', e);
      throw e;
    }
  }

  public static getClient() {
    return mongoose.connection.getClient();
  }

  public static async close(): Promise<void> {
    try {
      await mongoose.connection.close();
      console.info('MongoDB connection closed');
    } catch (e) {
      console.error('Error closing MongoDB connection:', e);
      throw e;
    }
  }
}

export default Database;
