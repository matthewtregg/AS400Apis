const Repository = require("../models/Repository.js");

const getRep = async (req, res) => {
  const repository = new Repository();
  const dbList = await repository.getdbList();
  res.send(dbList);
};

module.exports = {
  getRep
};
