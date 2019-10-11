const PgmCalls = require("../models/PgmCalls");

// needs refactoring
// make back end non-blocking
const getDFDFileInfo = async (req, res) => {
  const fileId = req.params.fileId;
  const DBname = req.params.DBname;
  let fileDFDFiles = new EntFiles();
  fileDFDFiles = await PgmFiles.getPgmFiles(fileId, DBname);
  // look in filese
  res.send(JSON.stringify({ Error: false, files: files }));
};

module.exports = {
  createPgmStrChartTwo
};
