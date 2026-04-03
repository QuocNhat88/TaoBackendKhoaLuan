const repo = require("./building.repository");
const mapper = require("./building.mapper");

const createBuilding = async (reqBody) => {
  const entity = mapper.toEntity(reqBody);
  const result = await repo.createBuilding(entity);

  return {
    id: result.id,
  };
};

const getAllBuildings = async (query) => {
  const { page = 0, size = 10 } = query;

  const result = await repo.getAllBuildings({ page, size });

  return {
    data: result.rows.map(mapper.toResponse),
    size: result.rows.length,
    totalElements: result.total,
    totalPages: Math.ceil(result.total / size),
    page: Number(page),
    pageSize: Number(size),
  };
};

module.exports = {
  createBuilding,
  getAllBuildings,
};
