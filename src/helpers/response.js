const _createResponse = (res, body, statusCode) => {
  return res.status(statusCode).send(body);
};

const success = (res, body, statusCode = 200) => {
  return _createResponse(res, body, statusCode);
};

const error = (res, error) => {
  const statusCode = error.httpStatusCode || 500;
  const body = {
    error: {
      code: error.businessStatusCode || '500_internal-error-server',
      message: error.message,
    },
  };

  console.error(error.message, error);

  return _createResponse(res, body, statusCode);
};

class HttpError extends Error {
  constructor(message, httpStatusCode, businessStatusCode) {
    super(message);
    this.name = 'HttpError';
    this.httpStatusCode = httpStatusCode;
    this.businessStatusCode = businessStatusCode;
  }
}

module.exports = {
  success,
  error,
  HttpError,
};
