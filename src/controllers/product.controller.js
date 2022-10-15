const services = require('../services');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { message } = await services.productService.findAll();
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await services.productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await services.productService.registerProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
};