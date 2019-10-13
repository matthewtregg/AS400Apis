const PgmDefs = require('../models/PgmDefs');
const Entities = require('../models/Entities');


const getProgramList = async(req,res) => {
  console.log("Pgm List");
  const dbname = req.params.DBname;
  const pgmDefs = new PgmDefs ();
  const programList = await pgmDefs.getPgmList(dbname);
  console.log('Sending response from getProgramList')
  res.send(programList);   
}

const getEntList = async(req, res) => {
  const dbname = req.params.DBname;
  console.log(dbname);
  const entities = new Entities ();
  const entityList = await entities.getFileList(dbname);
  res.send(entityList);
}


module.exports = {
  getProgramList,
  getEntList
}