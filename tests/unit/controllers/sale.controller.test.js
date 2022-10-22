const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const saleController = require('../../../src/controllers/sale.controller');
const { saleService } = require('../../../src/services');
const { newSale } = require('../mocks/sale.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('tests for the controller of sale', function () {
  afterEach(sinon.restore);

  describe('register a new sale', function () {
    it('unsuccessfully register', async function () {
      const res = {};
      const req = { newSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'registerSale')
        .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

      await saleController.registerSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('successfully register', async function () {
      const res = {};
      const req = { newSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'registerSale')
        .resolves({ type: null, message: newSale });

      await saleController.registerSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    })
  });

  describe('get sale by id', function () {
    it('sale doesnt exists', async function () {
      const res = {};
      const req = {
        params: { id: 8 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'getSaleById')
        .resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

      await saleController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('sale exists', async function () {
      const res = {};
      const req = { 
        params: { id: 8 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'getSaleById')
        .resolves({ type: null, message: newSale });

      await saleController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(newSale);
    });
  });

  it('get all sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(saleService, 'getAllSales')
      .resolves({ type: null, message: newSale });

    await saleController.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newSale);
  });
});