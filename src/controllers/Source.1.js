const PgmCode = require("../models/PgmCode");

const getSourceCode = async (req, res) => {
  const pgmId = req.params.pgmId;
  const DBname = req.params.DBname;
  const pgmCode = new PgmCode();
  const CodeData = await pgmCode.getPgmSource(pgmId, DBname);
  res.send(JSON.stringify({ Error: false, sourceData: CodeData }));
};

module.exports = {
  getSourceCode
};
