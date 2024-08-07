import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const getBreedsValidationSchema = Joi.object({});

const getBreedByIdValidationSchema = Joi.object({
  breed_id: Joi.string().required().messages({
    'string.base': 'Breed ID must be a string',
    'string.empty': 'Breed ID is required',
  }),
});

const searchBreedsValidationSchema = Joi.object({
  query: Joi.string().optional().messages({
    'string.base': 'Query must be a string',
  }),
});

export const validateGetBreeds = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = getBreedsValidationSchema.validate(req.query);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};

export const validateGetBreedById = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = getBreedByIdValidationSchema.validate(req.params);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};

export const validateSearchBreeds = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = searchBreedsValidationSchema.validate(req.query);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};
