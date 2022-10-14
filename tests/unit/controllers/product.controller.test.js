const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productController = require('../../../src/controllers/product.controller');
const productServices = require('../../../src/services/product.service');
const { products } = require('./mocks/product.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('tests for the controller of products', function () {
  afterEach(sinon.restore);

  it('get the list of all products', async function () {
    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productServices, 'findAll')
      .resolves({ type: null, message: products });

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  describe('get product by id', function () {
    it('return an error if product was not found', async function () {
      const res = {};
      const req = {
        params: { id: 324 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productServices, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('return the right product and status if ID is correct', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productServices, 'findById')
        .resolves({ type: null, message: products[0] })

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });
  });
});