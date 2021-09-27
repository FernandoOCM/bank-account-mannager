//
// imports
const response = require('../../helpers/response.js');
const serviceDb = require('../../services/database');

const getBalance = async (req, res) => {
  const { personId, accountId } = req.params;

  const account = await serviceDb.account.getBalance(accountId, personId);

  if (!account) {
    throw new response.HttpError('account not found', 404, 'bank-api_404_account-not-found');
  }

  return response.success(res, account);
};

module.exports = {
  getBalance,
};
