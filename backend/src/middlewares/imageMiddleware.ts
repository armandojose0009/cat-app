import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const imageValidationSchema = Joi.object({
  breed_id: Joi.string().required().messages({
    'string.base': 'Breed ID must be a string',
    'string.empty': 'Breed ID is required',
  }),
});

export const validateGetImagesByBreedId = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = imageValidationSchema.validate(req.query);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};
