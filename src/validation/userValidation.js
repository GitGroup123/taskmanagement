const Joi = require('joi');

exports.registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
});

exports.loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});