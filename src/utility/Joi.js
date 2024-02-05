import Joi from 'joi';

export const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  middleName: Joi.string().min(0).max(20),
  lastName: Joi.string().min(3).max(20).required(),
  phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `Phone number must have between 10-15 digits.` }).required(),
  email: Joi.string().max(62).required().email({ tlds: false }),
  password: Joi.string().required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
    .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
  imgUrl: Joi.string().min(0).max(2083),
  imgAlt: Joi.string().min(0).max(20),
  state: Joi.string().min(0).max(20),
  country: Joi.string().min(3).required(),
  city: Joi.string().min(3).max(35).required(),
  street: Joi.string().min(3).max(95).required(),
  houseNumber: Joi.number().min(1).required(),
  zip: Joi.any(),
  business: Joi.boolean().default(false),
});

export const cardSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  subtitle: Joi.string().min(3).max(35).required(),
  description: Joi.string().min(3).max(500).required(),
  phone: Joi.string().regex(/^[0-9]{9,15}$/).messages({ 'string.pattern.base': `Phone number must have between 9-15 digits.` }).required(),
  email: Joi.string().max(62).required().email({ tlds: false }),
  web: Joi.string().min(0).max(300),
  imgUrl: Joi.string().min(0).max(500),
  imgAlt: Joi.string().min(0).max(30),
  state: Joi.string().min(0).max(30),
  country: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  street: Joi.string().min(3).max(30).required(),
  houseNumber: Joi.string().min(1).max(10).required(),
  zip: Joi.string().min(0),
});

export const noPassSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  middleName: Joi.string().min(0).max(20),
  lastName: Joi.string().min(3).max(20).required(),
  phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `Phone number must have between 10-15 digits.` }).required(),
  email: Joi.string().max(62).required().email({ tlds: false }),
  imgUrl: Joi.string().min(0).max(2083),
  imgAlt: Joi.string().min(0).max(20),
  state: Joi.string().min(0).max(20),
  country: Joi.string().min(3).required(),
  city: Joi.string().min(3).max(35).required(),
  street: Joi.string().min(3).max(95).required(),
  houseNumber: Joi.number().min(1).required(),
  zip: Joi.any(),
  business: Joi.boolean().default(false),
});