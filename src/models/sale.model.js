const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./db/connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insertSaleProduct = async (saleId, info) => {
  const columns = Object.keys(snakeize(info)).map((key) => `${key}`).join(',');
  const placeholders = Object.keys(info).map((_key) => '?').join(',');
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
    [saleId, ...Object.values(info)],
  );
};

const getSaleByIdWithoutDate = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sp.product_id, sp.quantity  
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
      WHERE sp.sale_id = ?`,
    [saleId],
  );
  return camelize(result);
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
      WHERE sp.sale_id = ?`,
    [saleId],
  );
  return camelize(result);
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
      ORDER BY sp.sale_id, sp.product_id`,
  );
  return camelize(result);
};

module.exports = {
  insertSale,
  insertSaleProduct,
  getSaleByIdWithoutDate,
  getSaleById,
  getAllSales,
};