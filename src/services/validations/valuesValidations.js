const { idSchema, nameSchema, quantitySchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'id must be a number' };

  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
    return {
      type: 'INVALID_NAME', message: '"name" length must be at least 5 characters long',
    }; 
  } 
  return { type: null, message: '' };
};

const validateSale = (salesInfo) => {
  for (let i = 0; i < salesInfo.length; i += 1) {
    const { error } = quantitySchema.validate(salesInfo[i].quantity);
    if (error) {
      return {
        type: 'INVALID_QUANTITY', message: '"quantity" must be greater than or equal to 1',
      };
    }
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
  validateSale,
};