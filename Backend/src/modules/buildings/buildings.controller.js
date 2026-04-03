const service = require("./buildings.service");

const createBuilding = async (req, res) => {
  try {
    const data = await service.createBuilding(req.body);

    res.status(201).json({
      operationType: "Success",
      message: "Create building successfully",
      code: "CREATED",
      data,
      size: 1,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllBuildings = async (req, res) => {
  try {
    const result = await service.getAllBuildings(req.query);

    res.json({
      operationType: "Success",
      message: "success",
      code: "OK",
      ...result,
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createBuilding,
  getAllBuildings,
};
