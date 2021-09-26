const accounts = require('./accounts.js');
const accountTransactions = require('./accountTransactions.js');

module.exports.init = (expressInstance, basePath) => {
  accounts.init(expressInstance, basePath);
  accountTransactions.init(expressInstance, basePath);
};
