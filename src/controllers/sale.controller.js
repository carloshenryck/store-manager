const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const registerSale = async (req, res) => {
  const salesInfo = req.body;
  const { type, message } = await saleService.registerSale(salesInfo);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const getAllSales = async (_req, res) => {
  const { message } = await saleService.getAllSales();
  res.status(200).json(message);
};

module.exports = {
  registerSale,
  getSaleById,
  getAllSales,
};