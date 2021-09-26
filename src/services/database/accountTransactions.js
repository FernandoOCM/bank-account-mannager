const db = require('../../database/index.js');

const create = async ({ value, date, type }, accountId) => {
  const query = `
    INSERT INTO account_transaction(
      account_id,
      value,
      date,
      type
    ) VALUES (
      $1, $2, $3, $4
    );
  `;

  const values = [accountId, value, date, type];

  return await db.write.query(query, values);
};

const get = async (accountId, dateStart, dateFinish) => {
  const dateStartFilter = dateStart ? ` AND date >= '${dateStart}' ` : '';
  const dateFinishFilter = dateFinish ? ` AND date < '${dateFinish}' ` : '';

  const query = `
    SELECT 
      value,
      type,
      date 
    FROM 
      account_transaction
    WHERE 
      account_id = $1 
      ${dateStartFilter}
      ${dateFinishFilter}
    ORDER BY 
      date
    `;

  const values = [accountId];

  return await db.read.query(query, values);
};

const getTodayWithdraws = async (accountId, today, tomorrow) => {
  const query = `
    SELECT
      SUM(value) as value
    FROM 
      account_transaction 
    WHERE
      account_id = $1
    AND 
      date >= $2 
    AND 
      date < $3
    AND 
      type = 2 
  `;

  const values = [accountId, today, tomorrow];

  return await db.read.queryFirstOrNull(query, values);
};

module.exports = {
  create,
  get,
  getTodayWithdraws,
};
