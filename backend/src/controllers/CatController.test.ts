import { Request, Response } from 'express';
import sinon from 'sinon';
import CatService from '../services/CatService';
import CatController from './CatController';

describe('CatController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: sinon.SinonStub;
  let status: sinon.SinonStub;

  beforeEach(() => {
    req = {};
    res = {
      json: json = sinon.stub(),
      status: status = sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getBreeds', () => {
    it('should return breeds successfully', async () => {
      const breeds = [{ id: 1, name: 'Siamese' }];
      sinon.stub(CatService, 'getBreeds').resolves(breeds);

      await CatController.getBreeds(req as Request, res as Response);
      sinon.assert.calledWith(json, breeds);
    });

    it('should handle errors', async () => {
      sinon.stub(CatService, 'getBreeds').rejects(new Error('Error fetching breeds'));

      await CatController.getBreeds(req as Request, res as Response);

      sinon.assert.calledWith(status, 500);
      sinon.assert.calledWith(json, { error: 'Error fetching breeds' });
    });
  });

  describe('getBreedById', () => {
    it('should return breed by ID successfully', async () => {
      const breed = { id: 1, name: 'Siamese' };
      req.params = { breed_id: '1' };
      sinon.stub(CatService, 'getBreedById').withArgs('1').resolves(breed);

      await CatController.getBreedById(req as Request, res as Response);

      sinon.assert.calledWith(json, breed);
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
    it('should return searched breeds successfully', async () => {
      const breeds = [{ id: 1, name: 'Siamese' }];
      req.query = { q: 'Siamese' };
      sinon.stub(CatService, 'searchBreeds').withArgs('Siamese').resolves(breeds);

      await CatController.searchBreeds(req as Request, res as Response);

      sinon.assert.calledWith(json, breeds);
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
