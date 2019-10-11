const PgmCalls = require("../models/PgmCalls");

// needs refactoring
// make back end non-blocking
const createPgmStrChartTwo = async (req, res) => {
  const DBname = req.params.DBname;
  const pgmCalls = new PgmCalls();
  const programs = await pgmCalls.getDisplayPgms(DBname);
  res.send(JSON.stringify({ Error: false, progams: programs }));
};

module.exports = {
  createPgmStrChartTwo
};
