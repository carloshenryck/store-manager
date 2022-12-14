const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel, productModel } = require('../../../src/models');
const { newSale, wrongSale } = require('../mocks/sale.mock');
const { saleService } = require('../../../src/services/index');

describe('tests for the service of sales', function () {
  afterEach(sinon.restore);

  describe('register a new sale', function () {
    it('quantity is zero or below', async function () {
      const result = await saleService.registerSale(wrongSale);
      expect(result).to.be.deep.equal({
        type: 'INVALID', message: '"quantity" must be greater than or equal to 1'
      });
    });


    it('product does not exist', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await saleService.registerSale(newSale);
      expect(result).to.be.deep.equal({ type: 'NOT_FOUND', message: 'Product not found' });
    });

    it('successfully register', async function () {
      sinon.stub(saleModel, 'insertSale').resolves(3);
      sinon.stub(saleModel, 'insertSaleProduct').resolves(null);
      sinon.stub(saleModel, 'getSaleByIdWithoutDate').resolves(newSale);
      sinon.stub(productModel, 'findById').resolves(1);

      const result = await saleService.registerSale(newSale);
      expect(result.message).to.be.deep.equal({ id: 3, itemsSold: newSale });
    });
  });

  describe('get sale by id', function () {
    it('product doesnt exist', async function () {
      sinon.stub(saleModel, 'getSaleById').resolves([]);
      const result = await saleService.getSaleById(1);
      expect(result.type).equal('NOT_FOUND');
      expect(result.message).equal('Sale not found');
    })

    it('product exist', async function () {
      sinon.stub(saleModel, 'getSaleById').resolves(newSale);
      const result = await saleService.getSaleById(1);
      expect(result.message).to.be.deep.equal(newSale);
    })
  });

  it('get all sales', async function () {
    sinon.stub(saleModel, 'getAllSales').resolves(newSale);
    const result = await saleService.getAllSales();
    expect(result.message).to.be.deep.equal(newSale);
  });
});