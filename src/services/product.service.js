const models = require('../models');
const { validateId, validateName } = require('./validations/valuesValidations');

const findAll = async () => {
  const products = await models.productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await models.productModel.findById(productId);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const registerProduct = async (productName) => {
  const error = validateName(productName);
  if (error.type) return error;

  const productId = await models.productModel.registerProduct(productName);
  const product = await models.productModel.findById(productId);
  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
  registerProduct,
};