const errorMap = {
  NOT_FOUND: 404,
  INVALID: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
