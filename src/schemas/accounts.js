const jsonValidator = require('../helpers/jsonValidator.js');

const validateCreateBody = (body) => {
  const createSchema = {
    id: '/CreateAccount',
    type: 'object',
    properties: {
      dailyWithdrawalLimit: { type: 'number', minimum: 0 },
      active: { type: 'boolean' },
      type: { type: 'integer', minimum: 1 },
      creationDate: { type: 'date-time' },
    },
    required: ['dailyWithdrawalLimit', 'active', 'type', 'creationDate'],
  };
  return jsonValidator.validate(createSchema, body);
};

const validadeUpdateActiveStatusBody = (body) => {
  const createSchema = {
    id: '/UpdateActiveStatusBody',
    type: 'object',
    properties: {
      active: { type: 'boolean' },
    },
    required: ['active'],
  };
  return jsonValidator.validate(createSchema, body);
};

module.exports = {
  validateCreateBody,
  validadeUpdateActiveStatusBody,
};
