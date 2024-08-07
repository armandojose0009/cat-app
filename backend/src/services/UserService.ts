import UserModel, { IUser } from '../models/User';

export class UserService {
  private userModel = UserModel;

  public async login(username: string, password: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ username, password }).exec();
    return user;
  }

  public async register(username: string, password: string, email: string): Promise<IUser> {
    const newUser = new this.userModel({ username, password, email });
    await newUser.save();
    return newUser.toObject();
  }
}
