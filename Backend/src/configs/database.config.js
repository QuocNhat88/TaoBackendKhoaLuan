require("dotenv").config(); // Bắt buộc phải có dòng này để đọc file .env
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    // Chỉ cần lấy ngày giờ hiện tại ra để log hoặc log câu thông báo đơn giản
    console.log("✅ Kết nối với DB Supabase thành công lúc:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Lỗi kết nối DB:", err);
  }
}

// Export ra để dùng chung cho toàn dự án
module.exports = { pool, connectDB };
