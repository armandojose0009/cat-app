import { Request, Response } from 'express';
import sinon from 'sinon';
import CatService from '../services/CatService';
import CatController from './CatController';
import RedisClient from '../config/redis';

describe('CatController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: sinon.SinonStub;
  let status: sinon.SinonStub;
  let redisGetDataStub: sinon.SinonStub;
  let redisSetDataStub: sinon.SinonStub;

  beforeEach(() => {
    req = {};
    res = {
      json: json = sinon.stub(),
      status: status = sinon.stub().returnsThis(),
    };
    const redisClient = RedisClient.getInstance();
    redisGetDataStub = sinon.stub(redisClient, 'getData');
    redisSetDataStub = sinon.stub(redisClient, 'setData');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getBreeds', () => {
    it('should return breeds successfully with Redis', async () => {
      const breeds = [{ id: 1, name: 'Siamese' }];
      sinon.stub(CatService, 'getBreeds').resolves(breeds);
      redisGetDataStub.resolves(JSON.stringify(breeds));

      await CatController.getBreeds(req as Request, res as Response);
      sinon.assert.calledWith(json, breeds);
    });

    it('should return breeds successfully without Redis', async () => {
      const breeds = [{ id: 1, name: 'Siamese' }];
      sinon.stub(CatService, 'getBreeds').resolves(breeds);
      redisGetDataStub.resolves();
      redisSetDataStub.resolves();

      await CatController.getBreeds(req as Request, res as Response);
      const jsonValue = (json as sinon.SinonStub).getCall(0).args[0];
      expect(jsonValue).toEqual(breeds);
    });

    it('should handle errors', async () => {
      sinon.stub(CatService, 'getBreeds').rejects(new Error('Error fetching breeds'));

      await CatController.getBreeds(req as Request, res as Response);

      sinon.assert.calledWith(status, 500);
      sinon.assert.calledWith(json, { error: 'Error fetching breeds' });
    });
  });

  describe('getBreedById', () => {
    it('should return breed by ID successfully with redis', async () => {
      const breed = { id: 1, name: 'Siamese' };
      req.params = { breed_id: '1' };
      sinon.stub(CatService, 'getBreedById').withArgs('1').resolves(breed);
      redisGetDataStub.resolves(JSON.stringify(breed));

      await CatController.getBreedById(req as Request, res as Response);

      sinon.assert.calledWith(json, breed);
    });

    it('should return breed by ID successfully without redis', async () => {
      const breed = { id: 1, name: 'Siamese' };
      req.params = { breed_id: '1' };
      sinon.stub(CatService, 'getBreedById').withArgs('1').resolves(breed);
      redisGetDataStub.resolves();
      redisSetDataStub.resolves();

      await CatController.getBreedById(req as Request, res as Response);

      const jsonValue = (json as sinon.SinonStub).getCall(0).args[0];
      expect(jsonValue).toEqual(breed);
    });

    it('should handle errors', async () => {
      req.params = { breed_id: '1' };
      sinon.stub(CatService, 'getBreedById').withArgs('1').rejects(new Error('Error fetching breed'));

      await CatController.getBreedById(req as Request, res as Response);

      sinon.assert.calledWith(status, 500);
      sinon.assert.calledWith(json, { error: 'Error fetching breed' });
    });
  });

  describe('searchBreeds', () => {
    it('should return searched breeds successfully with redis', async () => {
      const breeds = [{ id: 1, name: 'Siamese' }];
      req.query = { q: 'Siamese' };
      sinon.stub(CatService, 'searchBreeds').withArgs('Siamese').resolves(breeds);
      redisGetDataStub.resolves(JSON.stringify(breeds));

      await CatController.searchBreeds(req as Request, res as Response);

      sinon.assert.calledWith(json, breeds);
    });

    it('should return searched breeds successfully without redis', async () => {
      const breeds = [{ id: 1, name: 'Siamese' }];
      req.query = { q: 'Siamese' };
      sinon.stub(CatService, 'searchBreeds').withArgs('Siamese').resolves(breeds);
      redisGetDataStub.resolves();
      redisSetDataStub.resolves();

      await CatController.searchBreeds(req as Request, res as Response);

      const jsonValue = (json as sinon.SinonStub).getCall(0).args[0];
      expect(jsonValue).toEqual(breeds);
    });

    it('should handle errors', async () => {
      req.query = { q: 'Siamese' };
      sinon.stub(CatService, 'searchBreeds').withArgs('Siamese').rejects(new Error('Error searching breeds'));

      await CatController.searchBreeds(req as Request, res as Response);

      sinon.assert.calledWith(status, 500);
      sinon.assert.calledWith(json, { error: 'Error searching breeds' });
    });
  });
});
