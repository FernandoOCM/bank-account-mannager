const pg = require('pg');
const camelCaseKeys = require('camelcase-keys');

const poolRead = new pg.Pool({
  host: process.env.DB_READ_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
});

let client = null;

const _connect = async () => {
  if (client === null) {
    client = await poolRead.connect();
  }
};

const query = async (text, params = []) => {
  await _connect();

  const result = await client.query(text, params);
  return camelCaseKeys(result.rows, { deep: true });
};

const queryFirstOrNull = async (text, params = []) => {
  await _connect();

  const result = await client.query(text, params);
  if (result.rowCount > 0) {
    return camelCaseKeys(result.rows[0], { deep: true });
  }
  return null;
};

module.exports = {
  query,
  queryFirstOrNull,
};
