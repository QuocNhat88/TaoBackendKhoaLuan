const buildingService = require("./buildings.service");

const buildingController = {
  // Xử lý API GET
  getAll: async (req, res) => {
    try {
      // Gọi Service để lấy data
      const data = await buildingService.getAllBuildings();
      // Trả về Frontend
      res
        .status(200)
        .json({ success: true, message: "Thành công!", data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi Server!" });
    }
  },

  // Xử lý API POST
  create: async (req, res) => {
    try {
      const bodyData = req.body;

      // 1. Kiểm tra dữ liệu (Validate) - Database bắt buộc phải có name và code
      if (!bodyData.name || !bodyData.code) {
        return res
          .status(400)
          .json({ success: false, message: "Tên và Mã tòa nhà là bắt buộc!" });
      }

      // 2. Gọi Service xử lý nhét vào DB
      const newData = await buildingService.createBuilding(bodyData);

      // 3. Trả kết quả thành công
      res
        .status(201)
        .json({ success: true, message: "Thêm thành công!", data: newData });
    } catch (error) {
      console.error(error);
      // Bắt lỗi trùng mã Tòa nhà từ PostgreSQL (Mã lỗi 23505)
      if (error.code === "23505") {
        return res
          .status(400)
          .json({ success: false, message: "Mã tòa nhà đã tồn tại!" });
      }
      res.status(500).json({ success: false, message: "Lỗi Server!" });
    }
  },
};

module.exports = buildingController;
