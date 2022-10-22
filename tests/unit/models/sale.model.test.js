const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');

const connection = require('../../../src/models/db/connection');
const { newSale } = require('../mocks/sale.mock');

describe('tests for the model of sale', function () {
  afterEach(sinon.restore);

  it('create a new sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await saleModel.insertSale();
    expect(result).equal(3);
  });

  it('insert on sale_product', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);
    const result = await saleModel.insertSaleProduct(3, newSale);
    expect(result).equal(undefined);
  });

  it('get sale by id without date', async function () {
    sinon.stub(connection, 'execute').resolves([newSale]);
    const result = await saleModel.getSaleByIdWithoutDate(1);
    expect(result).to.be.deep.equal(newSale);
  });

  it('get sale by id', async function () {
    sinon.stub(connection, 'execute').resolves([newSale]);
    const result = await saleModel.getSaleById(1);
    expect(result).to.be.deep.equal(newSale);
  });

  it('get all sales', async function () {
    sinon.stub(connection, 'execute').resolves([newSale]);
    const result = await saleModel.getAllSales();
    expect(result).to.be.deep.equal(newSale);
  });
});