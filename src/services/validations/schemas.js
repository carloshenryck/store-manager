const Joi = require('joi');

const idSchema = Joi.number().integer().required(); 
const nameSchema = Joi.string().min(5).required();
const quantitySchema = Joi.number().integer().min(1).required();

module.exports = {
  idSchema,
  nameSchema,
  quantitySchema,
};