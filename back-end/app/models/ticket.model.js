const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Ticket', {
  title: Joi.string().required(),
  description: Joi.string().required(),
  major: Joi.string().allow('').optional(),
  archived: Joi.boolean().required(),
  date: Joi.date().required(),
  studentIds: Joi.array().items(Joi.number()).required(),
});
