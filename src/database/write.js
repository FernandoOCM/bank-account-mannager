const pg = require('pg');

const poolWrite = new pg.Pool({
  host: process.env.DB_WRITE_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
});

let client = null;

const _connect = async () => {
  if (client === null) {
    client = await poolWrite.connect();
  }
};

const query = async (text, params = []) => {
  await _connect();

  const result = await client.query(text, params);
  return result.rows;
};

module.exports = {
  query,
};
