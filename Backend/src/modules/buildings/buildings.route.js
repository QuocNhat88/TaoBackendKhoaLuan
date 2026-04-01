const express = require("express");
const router = express.Router();
const buildingController = require("./buildings.controller");

// Khi gọi GET tới đây -> Chạy hàm getAll trong Controller
router.get("/", buildingController.getAll);

// Khi gọi POST tới đây -> Chạy hàm create trong Controller
router.post("/", buildingController.create);

module.exports = router;
