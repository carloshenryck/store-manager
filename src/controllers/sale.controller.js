const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const registerSale = async (req, res) => {
  const salesInfo = req.body;
  const { type, message } = await saleService.registerSale(salesInfo);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  registerSale,
};