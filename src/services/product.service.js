const models = require('../models');
const { validateId } = require('./validations/valuesValidations');

const findAll = async () => {
  const products = await models.productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validateId(productId);
  if (error.type) return error;

  const product = await models.productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
};