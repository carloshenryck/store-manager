const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productController = require('../../../src/controllers/product.controller');
const productServices = require('../../../src/services/product.service');
const { products, newProduct } = require('../mocks/product.mock');

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
        .resolves({ type: 'NOT_FOUND', message: 'Product not found' })

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

  describe('register a new product', function () {
    it('register a new product unsuccessfully returns an error', async function () {
      const res = {};
      const req = {
        body: { name: "Four" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productServices, 'registerProduct')
        .resolves({ type: 'INVALID', message: 'name length must be at least 5 characters long' });

      await productController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: 'name length must be at least 5 characters long' });
    });

    it('register a new product successfully', async function () {
      const res = {};
      const req = {
        body: { name: "Traje Homem de Ferro" },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productServices, 'registerProduct')
        .resolves({ type: null, message: newProduct });

      await productController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
  });
});