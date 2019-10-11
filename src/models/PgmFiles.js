const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();
class PgmFiles {
  constructor(
    pgmID,
    pgmDIR,
    viewID,
    viewDIR,
    objTYP,
    entID,
    fWRITE,
    fUPDATE,
    fSEQREAD,
    fDELETE,
    eFID,
    rLNID,
    fileNM,
    appNM,
    intFID,
    whDTTM,
    whFUSG,
    whRFSN,
    whOBJT,
    whOTYP,
    whSYSN,
    whSPKG,
    whRFNB
  ) {}

  async getPgmFiles(pgmId, DBname) {
    console.log("passd Pgmfiles");
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PgmFiles WHERE PGMID ='${pgmId}' `;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("PGMFILES====", rs.length);
        resolve(rs);
      });
    });
  }

  async getDFDinfo(viewId, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PgmFiles WHERE VIEWID = '${viewId}'`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("PGMFILES====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = PgmFiles;
