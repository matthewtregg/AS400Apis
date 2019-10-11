const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();
class PgmDefs {
  constructor(
    pgmID,
    rlvchlcnt,
    pgmnm,
    pgmtx,
    pgmcls,
    objpgm,
    pgmtyp,
    srcmbrnm,
    srcfile,
    srcdir,
    fileid,
    viewid,
    cmpcls,
    crtdat,
    crtby,
    upddat,
    updby,
    dirnm,
    appnm,
    connected,
    entrypnt
  ) {}

  async getPgmDefList(pgmIds, DBname) {
    return new Promise((resolve, reject) => {
    console.log("into getpgmdefslist");
    let pgmIdValues = "(";
    pgmIds.forEach((id, index) => {
      if (index === 0) pgmIdValues += "'" + id + "'";
      else pgmIdValues += "," + "'" + id + "'";
    });
    pgmIdValues += ")";
    //console.log(pgmIdValues);

    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PgmDefs WHERE PGMID IN ${pgmIdValues}`;

      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getPGMDEFSlist====", rs.length);
        resolve(rs);
      });
    });
  }

  async getPgmList(dbName) {
    return new Promise((resolve, reject) => {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);
    let query = `SELECT PGMTYP,PGMTX,DIRNM, PGMID FROM ${dbName}.PgmDefs`;

      stmt.exec(query, rs => {
        stmt.close();
        console.log("Fetched PgmList====", rs.length, dbName);
        resolve(rs);
      });
    });
  };
}



module.exports = PgmDefs;
