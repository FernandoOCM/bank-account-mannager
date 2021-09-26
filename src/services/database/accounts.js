const db = require('../../database/index.js');

const create = async ({ dailyWithdrawalLimit, active, type, creationDate }, personId) => {
  const query = `
    INSERT INTO account(
      person_id,
      daily_withdrawal_limit,
      active,
      type,
      creation_date,
      balance
    ) VALUES (
      $1, $2, $3, $4, $5, 0
    );
  `;

  const values = [personId, dailyWithdrawalLimit, active, type, creationDate];

  return await db.write.query(query, values);
};

const updateActiveStatus = async (active, accountId, personId) => {
  const query = `
    UPDATE 
      account
    SET
      active = $1
    WHERE 
      account_id = $2
      AND person_id = $3
  `;

  const values = [active, accountId, personId];

  return await db.write.query(query, values);
};

const getById = async (accountId, personId) => {
  const query = `
      SELECT 
        balance,
        daily_withdrawal_limit,
        active,
        type,
        creation_date
      FROM 
        account
      WHERE 
        account_id = $1
        AND person_id = $2
    `;

  const values = [accountId, personId];

  return await db.read.queryFirstOrNull(query, values);
};

const getBalance = async (accountId, personId) => {
  const query = `
    SELECT 
      balance 
    FROM 
      account
    WHERE 
      account_id = $1
      AND person_id = $2
  `;

  const values = [accountId, personId];

  return await db.read.queryFirstOrNull(query, values);
};

const updateBalance = async (balance, accountId, personId) => {
  const query = `
      UPDATE 
        account
      SET
        balance = $1
      WHERE 
        account_id = $2
        AND person_id = $3
    `;

  const values = [balance, accountId, personId];

  return await db.write.query(query, values);
};

module.exports = {
  create,
  updateActiveStatus,
  getById,
  getBalance,
  updateBalance,
};
