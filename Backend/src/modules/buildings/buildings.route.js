const express = require("express");
const router = express.Router();
const controller = require("./buildings.controller");

router.post("/", controller.createBuilding);
router.get("/", controller.getAllBuildings);

module.exports = router;
