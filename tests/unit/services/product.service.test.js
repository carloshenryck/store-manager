const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/product.model');
const { products } = require('./mocks/product.model.mock');
const { findAll, findById } = require('../../../src/services/product.service');

describe('tests for the service of products', function () {
  afterEach(sinon.restore);

  it('get the list of all products', async function () {
    sinon.stub(productModel, 'findAll').resolves(products);
    const result = await findAll();
    expect(result.message).to.deep.equal(products);
  });

  describe('get product by ID', function () {
    it('return an error if ID is not a number', async function () {
      const result = await findById('string');
      expect(result.message).to.deep.equal('id must be a number');
    });

    it('return an error if ID doesnt exist', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await findById(324);
      expect(result.message).to.deep.equal('Product not found');
    });

    it('return the right product if ID is correct', async function () {
      sinon.stub(productModel, 'findById').resolves(products[0]);
      const result = await findById(1);
      expect(result.message).to.deep.equal(products[0]);
    });
  });
});