import { Request, Response } from 'express';
import sinon from 'sinon';
import { UserController } from './UserController';
import { UserService } from '../services/UserService';
import RedisClient from '../config/redis';

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: sinon.SinonStub;
  let status: sinon.SinonStub;
  let redisGetDataStub: sinon.SinonStub;
  let redisSetDataStub: sinon.SinonStub;
  let userServiceRegisterStub: sinon.SinonStub;
  let userServiceLoginStub: sinon.SinonStub;
  const UserControllerClient = new UserController();

  beforeEach(() => {
    req = {};
    res = {
      json: json = sinon.stub(),
      status: status = sinon.stub().returnsThis(),
    };
    
    const redisClient = RedisClient.getInstance();
    const UserServiceClient = new UserService();
    redisGetDataStub = sinon.stub(redisClient, 'getData');
    redisSetDataStub = sinon.stub(redisClient, 'setData');
    userServiceRegisterStub = sinon.stub(UserServiceClient, 'register');
    userServiceLoginStub = sinon.stub(UserServiceClient, 'login');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('register', () => {
    it.only('should register a user and cache it', async () => {
      const user = { username: 'testuser', password: 'password', email: 'test@example.com' };
      req.body = user;
      userServiceRegisterStub.resolves(user);
      redisSetDataStub.resolves();

      await UserControllerClient.register(req as Request, res as Response);

      sinon.assert.calledWith(json, user);
      sinon.assert.calledWith(redisSetDataStub, `user:${user.username}`, JSON.stringify(user));
    });

    it('should handle registration errors', async () => {
      req.body = { username: 'testuser', password: 'password', email: 'test@example.com' };
      userServiceRegisterStub.rejects(new Error('Registration error'));

      await UserControllerClient.register(req as Request, res as Response);

      sinon.assert.calledWith(status, 500);
      sinon.assert.calledWith(json, { message: 'Internal server error' });
    });
  });

  describe('login', () => {
    it('should log in a user with cached data', async () => {
      const user = { username: 'testuser', password: 'password', email: 'test@example.com' };
      req.body = { username: 'testuser', password: 'password' };
      redisGetDataStub.resolves(JSON.stringify(user));

      await UserControllerClient.login(req as Request, res as Response);

      sinon.assert.calledWith(json, user);
    });

    it('should log in a user without cache', async () => {
      const user = { username: 'testuser', password: 'password', email: 'test@example.com' };
      req.body = { username: 'testuser', password: 'password' };
      userServiceLoginStub.resolves(user);
      redisSetDataStub.resolves();

      await UserControllerClient.login(req as Request, res as Response);

      sinon.assert.calledWith(json, user);
      sinon.assert.calledWith(redisSetDataStub, `user:${user.username}`, JSON.stringify(user));
    });

    it('should handle login errors', async () => {
      req.body = { username: 'testuser', password: 'password' };
      userServiceLoginStub.rejects(new Error('Login error'));

      await UserControllerClient.login(req as Request, res as Response);

      sinon.assert.calledWith(status, 500);
      sinon.assert.calledWith(json, { message: 'Internal server error' });
    });
  });
});
