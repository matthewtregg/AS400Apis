const router = require("express").Router();
const Diagrams = require("./controllers/Diagrams");
const List = require("./controllers/Lists");
const Source = require("./controllers/Source");
const DFDPgms = require("./controllers/DFDPgms");
const EntRelChart = require("./controllers/EntRelChart");
const WhereUsed = require("./controllers/WhereUsed");
const Repository = require('./controllers/Repository'); 

router
  .get("/ProgramStructureChart/:DBname", Diagrams.createPgmStrChartTwo)
  .get("/ProgramList/:DBname", List.getProgramList)
  .get("/SourceBrowser/PgmCodeData/:pgmId/:DBname", Source.getSourceCode)
  .get("/PgmDFDPgm/:pgmId/:DBname", DFDPgms.getDFDPgmPgmInfo)
  .get("/PgmDFDFile/:pgmId/:DBname", DFDPgms.getDFDPgmFileInfo)
  .get("/PgmDFDCentral/:pgmId/:DBname", DFDPgms.getDFDPgmCentralInfo)
  .get("/FileDFDPgm/:entId/:DBname", DFDPgms.getDFDFilePgmInfo)
  .get("/FileDFDEnt/:entId/:DBname", DFDPgms.getDFDFileFileInfo)
  .get("/FileDFDCentral/:entId/:DBname", DFDPgms.getDFDFileCentralInfo)
  .get("/EntityRelationshipChart/:DBname", EntRelChart.getEntRelData)
  .get("/EntRel/:ent/:DBname", EntRelChart.getEntRelInfo)
  .get("/getEntRelParent/:ent/:DBname", EntRelChart.getEntRelParent)
  .get("/getEntRelChild/:ent/:DBname", EntRelChart.getEntRelChild)
  .get(
    "/findFileWhereUsedField/:dbName/:fieldId/:DBname",
    WhereUsed.getFileField
  )
  .get("/findPgmWhereUsed/:dbName/:PgmId/:DBname", WhereUsed.getPgms)
  .get("/findEntWhereUsed/:dbName/:EntId/:DBname", WhereUsed.getEnts)
  .get("/findVarWhereUsedSource/:dbName/:Var/:DBname", WhereUsed.getVar)
  .get('/getrep', Repository.getRep);
  
// STNTYPE
// just file or pgm where used
//some new comments
module.exports = router;
