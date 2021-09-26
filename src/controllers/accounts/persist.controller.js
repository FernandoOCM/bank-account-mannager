//
// imports
const response = require('../../helpers/response.js');
const serviceDb = require('../../services/database');
const accountSchemas = require('../../schemas/accounts.js');

const create = async (req, res) => {
  const { personId } = req.params;
  const accountRequest = accountSchemas.validateCreateBody(req.body);

  const person = await serviceDb.person.getById(personId);

  if (!person) {
    throw new response.HttpError('person not found', 404, 'bank-api_404_person-not-found');
  }

  await serviceDb.account.create(accountRequest, personId);

  return response.success(res, null, 201);
};

const updateActiveStatus = async (req, res) => {
  const { personId, accountId } = req.params;
  const accountActiveRequest = accountSchemas.validadeUpdateActiveStatusBody(req.body);

  const account = await serviceDb.account.getById(accountId, personId);

  if (!account) {
    throw new response.HttpError('account not found', 404, 'bank-api_404_account-not-found');
  }

  await serviceDb.account.updateActiveStatus(accountActiveRequest.active, accountId, personId);

  return response.success(res, null, 204);
};

module.exports = {
  create,
  updateActiveStatus,
};
