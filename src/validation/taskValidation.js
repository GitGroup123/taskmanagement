const Joi = require('joi');
const mongoose = require('mongoose');

const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

exports.addTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  userId: Joi.string().custom(isValidObjectId).required()
});
