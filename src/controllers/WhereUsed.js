const PgmCalls = require("../models/PgmCalls");
const PgmFiles = require("../models/PgmFiles");
const PgmSchema = require("../models/PgmSchema");
const PgmCode = require("../models/PgmCode");

const getFileField = async (req, res) => {
  const DBname = req.params.DBname;
  const fieldId = req.params.fieldId;
  const pgmSchema = new PgmSchema();
  pgmSchema
    .getFieldWhereUsed(fieldId, DBname)
    .then(result => res.send(result[0]));
};

const getPgms = async (req, res) => {
  const DBname = req.params.DBname;
  console.log(DBname);
  const pgmId = req.params.PgmId;
  const pgmCalls = new PgmCalls();
  pgmCalls.getWhereUsedPgms(pgmId, DBname).then(result => res.send(result));
};

const getEnts = async (req, res) => {
  const DBname = req.params.DBname;
  const entId = req.params.EntId;
  const pgmFiles = new PgmFiles();
  pgmFiles.getWhereUsedFiles(entId, DBname).then(result => res.send(result[0]));
};

const getVar = async (req, res) => {
  const DBname = req.params.DBname;
  const variable = req.params.Var;
  console.log(variable);
  const pgmCode = new PgmCode();
  pgmCode.getVarUsed(variable, DBname).then(result => {
    console.log(result);
    res.send(result[0]);
  });
};

module.exports = {
  getFileField,
  getPgms,
  getEnts,
  getVar
};
