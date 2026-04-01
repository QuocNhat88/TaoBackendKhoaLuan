const { pool } = require("../../configs/database.config");

const buildingService = {
  // 1. Hàm lấy danh sách
  getAllBuildings: async () => {
    const query = "SELECT * FROM buildings ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  },

  // 2. Hàm thêm mới
  createBuilding: async (data) => {
    // Nhận dữ liệu từ Controller truyền xuống
    const {
      name,
      code,
      address,
      total_floors,
      total_apartments,
      year_built,
      status,
    } = data;

    // Viết câu lệnh SQL (Dùng $1, $2 để chống hack SQL Injection)
    const query = `
            INSERT INTO buildings (name, code, address, total_floors, total_apartments, year_built, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *; 
        `;
    const values = [
      name,
      code,
      address,
      total_floors,
      total_apartments,
      year_built,
      status || "ACTIVE",
    ];

    const result = await pool.query(query, values);
    return result.rows[0]; // Trả về dòng dữ liệu vừa được tạo
  },
};

module.exports = buildingService;
