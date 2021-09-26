const accountTransactionRetrieveController = require('../controllers/account_transactions/retrieve.controller.js');
const accountTransactionPersistController = require('../controllers/account_transactions/persist.controller.js');

const init = (expressInstance, basePath) => {
  expressInstance.post(
    `${basePath}/person/:personId/account/:accountId/transaction`,
    accountTransactionPersistController.create
  );

  expressInstance.get(
    `${basePath}/person/:personId/account/:accountId/transaction`,
    accountTransactionRetrieveController.get
  );
};

module.exports = {
  init,
};
