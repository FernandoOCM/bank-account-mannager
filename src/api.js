//
// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//
// imports
const routes = require('./routes');
const response = require('./helpers/response.js');
const serviceDb = require('./services/database/index.js');

//
// config express
const server = express();
server.use(bodyParser.json({ limit: '600kb' }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

require('express-async-errors');

const _init = () => {
  server.use((req, res, next) => {
    response.error(res, new _error.HttpError(`Route not found - ${req.originalUrl}`, 404, '404-route-found'));
  });

  server.use((err, req, res, next) => {
    response.error(res, err);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

const basePath = process.env.API_VERSION || '/v1';

//
//routes
routes.init(server, basePath);
server.get(`${basePath}/healthcheck`, async (req, res) => {
  await serviceDb.ping();

  return response.success(res, { message: 'Service Integration OK', build: process.env.BUILD_NUMBER || null });
});

_init();

module.exports = server;
