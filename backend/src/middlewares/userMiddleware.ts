import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const registerValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
  }),
});

const loginValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
  }),
});

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = registerValidationSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = loginValidationSchema.validate(req.query);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};
