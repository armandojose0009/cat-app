import { Request, Response } from 'express';
import sinon from 'sinon';
import { ImageController } from './ImageController';
import { ImageService } from '../services/ImageService';
import RedisClient from '../config/redis';

describe('ImageController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let json: sinon.SinonStub;
  let status: sinon.SinonStub;
  let redisGetDataStub: sinon.SinonStub;
  let redisSetDataStub: sinon.SinonStub;
  let imageServiceGetImagesByBreedIdStub: sinon.SinonStub;
  let imageController: ImageController;

  beforeEach(() => {
    req = {};
    res = {
      json: json = sinon.stub(),
      status: status = sinon.stub().returnsThis(),
    };

    redisGetDataStub = sinon.stub(RedisClient.getInstance(), 'getData');
    redisSetDataStub = sinon.stub(RedisClient.getInstance(), 'setData');
    imageServiceGetImagesByBreedIdStub = sinon.stub(ImageService.prototype, 'getImagesByBreedId');
    imageController = new ImageController();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getImagesByBreedId', () => {
    it('should return images from cache if available', async () => {
      const breedId = '1';
      const images = [{ id: 1, url: 'http://example.com/image1.jpg' }];
      req.query = { breed_id: breedId };
      redisGetDataStub.resolves(JSON.stringify(images));

      await imageController.getImagesByBreedId(req as Request, res as Response);

      sinon.assert.calledWith(json, images);
      sinon.assert.notCalled(imageServiceGetImagesByBreedIdStub);
    });

    it('should return images from service and cache them if not available in cache', async () => {
      const breedId = '2';
      const images = [{ id: 2, url: 'http://example.com/image2.jpg' }];
      req.query = { breed_id: breedId };
      redisGetDataStub.resolves();
      imageServiceGetImagesByBreedIdStub.resolves(images);
      redisSetDataStub.resolves();

      await imageController.getImagesByBreedId(req as Request, res as Response);

      sinon.assert.calledWith(json, images);
      sinon.assert.calledWith(redisSetDataStub, `images:breed:${breedId}`, JSON.stringify(images));
    });

    it('should handle errors from the image service', async () => {
      const breedId = '3';
      req.query = { breed_id: breedId };
      redisGetDataStub.resolves();
      imageServiceGetImagesByBreedIdStub.rejects(new Error('Service error'));

      await imageController.getImagesByBreedId(req as Request, res as Response);

      sinon.assert.calledWith(status, 500);
      sinon.assert.calledWith(json, { message: 'Internal server error' });
    });
  });
});
