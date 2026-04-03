const { pool } = require("../../configs/database.config");

const createBuilding = async (building) => {
  const query = `
    INSERT INTO buildings (name, code, address, total_floors, total_apartments, year_built, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id
  `;

  const values = [
    building.name,
    building.code,
    building.address,
    building.total_floors,
    building.total_apartments,
    building.year_built,
    building.status,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllBuildings = async ({ page = 0, size = 10 }) => {
  const offset = page * size;

  const dataQuery = `
    SELECT * FROM buildings
    ORDER BY id DESC
    LIMIT $1 OFFSET $2
  `;

  const countQuery = `SELECT COUNT(*) FROM buildings`;

  const data = await pool.query(dataQuery, [size, offset]);
  const count = await pool.query(countQuery);

  return {
    rows: data.rows,
    total: parseInt(count.rows[0].count),
  };
};

module.exports = {
  createBuilding,
  getAllBuildings,
};
