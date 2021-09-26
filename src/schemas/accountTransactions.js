const jsonValidator = require('../helpers/jsonValidator.js');

const validateCreateBody = (body) => {
  const createSchema = {
    id: '/CreateAccountTransaction',
    type: 'object',
    properties: {
      value: { type: 'number', minimum: 1 },
      type: { type: 'integer', minimum: 1, maximum: 2 },
      date: { type: 'date-time' },
    },
    required: ['value', 'type', 'date'],
  };
  return jsonValidator.validate(createSchema, body);
};

module.exports = {
  validateCreateBody,
};
