const { saleModel, productModel } = require('../models');
const { validateSale } = require('./validations/valuesValidations');

const doesProductExists = async (salesInfo) => {
  let error = { type: null, message: '' };

  await Promise.all(
    salesInfo.map(async (sale) => {
      const result = await productModel.findById(sale.productId);
      if (!result) error = { type: 'NOT_FOUND', message: 'Product not found' };
    }),
  );
  
  return error;
};

const registerSale = async (salesInfo) => {
  const error = validateSale(salesInfo);
  if (error.type) return error;

  const existsError = await doesProductExists(salesInfo);
  if (existsError.type) return existsError;

  const saleId = await saleModel.insertSale();
  await Promise.all(
    salesInfo.map(async (sale) => {
      await saleModel.insertSaleProduct(saleId, sale);
    }),
  );

  const salesById = await saleModel.getSaleByIdWithoutDate(saleId);
  const sales = { id: saleId, itemsSold: salesById };
  return { type: null, message: sales };
};

const getSaleById = async (saleId) => {
  const sale = await saleModel.getSaleById(saleId);
  if (sale.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const getAllSales = async () => {
  const sale = await saleModel.getAllSales();
  return { type: null, message: sale };
};

module.exports = {
  registerSale,
  doesProductExists,
  getSaleById,
  getAllSales,
};