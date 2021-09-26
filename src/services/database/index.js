const db = require('../../database/index.js');

const ping = () => {
  const query = 'SELECT $1::text as message';
  const values = ['ping'];

  return db.read.query(query, values);
};

const person = require('./persons.js');
const account = require('./accounts.js');
const accountTransaction = require('./accountTransactions.js');

module.exports = {
  ping,
  person,
  account,
  accountTransaction,
};
