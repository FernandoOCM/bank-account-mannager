var moment = require('moment');

//
// imports
const response = require('../../helpers/response.js');
const serviceDb = require('../../services/database');
const accountTransactionsSchemas = require('../../schemas/accountTransactions.js');
const accountTransactionTypes = require('../../enums/accountTransactionType.js');

const create = async (req, res) => {
  const { personId, accountId } = req.params;
  const accountTransactionRequest = accountTransactionsSchemas.validateCreateBody(req.body);

  const account = await serviceDb.account.getById(accountId, personId);

  if (!account) {
    throw new response.HttpError('account not found', 404, 'bank-api_404_account-not-found');
  }

  if (!account.active) {
    throw new response.HttpError('account is blocked', 400, 'bank-api_400_account-is-blocked');
  }

  if (accountTransactionRequest.type == accountTransactionTypes.DEPOSIT) {
    account.balance = parseFloat(account.balance) + accountTransactionRequest.value;
  }

  if (accountTransactionRequest.type == accountTransactionTypes.WITHDRAW) {
    if (parseFloat(account.balance) < accountTransactionRequest.value) {
      throw new response.HttpError('insufficient account balance', 400, 'bank-api_400_insufficient-account-balance');
    }

    const today = moment().format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

    const todayWithdraws = await serviceDb.accountTransaction.getTodayWithdraws(accountId, today, tomorrow);

    todayWithdraws.value = todayWithdraws.value || 0;

    if (parseFloat(account.dailyWithdrawalLimit) < parseFloat(todayWithdraws.value) + accountTransactionRequest.value) {
      throw new response.HttpError('withdrawal limit exceeded', 400, 'bank-api_400_withdrawal-limit-exceeded');
    }

    account.balance = parseFloat(account.balance) - accountTransactionRequest.value;
  }

  await serviceDb.accountTransaction.create(accountTransactionRequest, accountId);
  await serviceDb.account.updateBalance(account.balance, accountId, personId);
  return response.success(res, null, 201);
};

module.exports = {
  create,
};
