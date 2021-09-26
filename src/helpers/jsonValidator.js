const jsonschema = require('jsonschema');
const response = require('./response.js');

const _buildResponseErrorMessage = (errors) => {
  let responseMessage = '';
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];

    if (error.property == 'instance') {
      responseMessage += error.message.replace(/"/g, '');
    } else {
      error.property = error.property.replace('instance.', '');
      responseMessage += `${error.property} ${error.message.replace(/"/g, '')}`;
    }
    if (i < errors.length - 1) {
      responseMessage += ' || ';
    }
  }
  throw new response.HttpError(responseMessage, 400, 'bank-api_400_bad-request-body');
};

const validate = (schema, jsonObject) => {
  const validator = new jsonschema.Validator();
  let validatorResult = validator.validate(jsonObject, schema);

  if (validatorResult.errors.length > 0) {
    _buildResponseErrorMessage(validatorResult.errors);
  }

  return validatorResult.instance;
};

module.exports = {
  validate,
};
