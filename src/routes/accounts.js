const accountRetrieveController = require('../controllers/accounts/retrieve.controller.js');
const accountPersistController = require('../controllers/accounts/persist.controller.js');

const init = (expressInstance, basePath) => {
  expressInstance.get(`${basePath}/person/:personId/account/:accountId`, accountRetrieveController.getBalance);

  expressInstance.post(`${basePath}/person/:personId/account`, accountPersistController.create);

  expressInstance.patch(`${basePath}/person/:personId/account/:accountId`, accountPersistController.updateActiveStatus);
};

module.exports = {
  init,
};
