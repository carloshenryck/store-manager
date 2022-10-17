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

  it('register a new sale', async function () {
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