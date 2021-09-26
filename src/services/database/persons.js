const db = require('../../database/index.js');

const getById = async (id) => {
  const query = `
    SELECT
        person_id, name, cpf, birth_date
    FROM
        person
    WHERE
        person_id = $1
  `;

  const values = [id];
  return await db.read.queryFirstOrNull(query, values);
};

module.exports = {
  getById,
};
