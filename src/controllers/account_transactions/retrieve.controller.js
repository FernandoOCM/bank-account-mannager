//
// imports
const response = require('../../helpers/response.js');
const serviceDb = require('../../services/database');

const get = async (req, res) => {
  const { personId, accountId } = req.params;
  const { dateStart, dateFinish } = req.query;

  const account = await serviceDb.account.getById(accountId, personId);

  if (!account) {
    throw new response.HttpError('account not found', 404, 'bank-api_404_account-not-found');
  }

  const accountTransactions = await serviceDb.accountTransaction.get(accountId, dateStart, dateFinish);

  return response.success(res, accountTransactions);
};

module.exports = {
  get,
};
