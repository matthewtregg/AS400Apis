const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();

class Entities {
  constructor(
    entID,
    rcdfmt,
    entnm,
    enttx,
    enttp,
    crtdat,
    crtby,
    upddat,
    updby,
    objpgm,
    pgmtyp,
    srcmbrnm,
    srcfile,
    srcdir,
    dirnm,
    appnm
  ) {}

  async getEntDefList(entIds, DBname) {
    console.log("into getEntDefList");
    let entIdValues = "(";
    entIds.forEach((id, index) => {
      if (index === 0) entIdValues += "'" + id + "'";
      else entIdValues += "," + "'" + id + "'";
    });
    entIdValues += ")";

    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.Entities WHERE ENTID IN ${entIdValues}`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getEntDefList====", rs.length);
        resolve(rs);
      });
    });
  }

  async getFileList(DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);
    return new Promise((resolve, reject) => {
      let query = `SELECT DISTINCT ENTID FROM ${DBname}.Entities`;
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getent list fetched====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = Entities;
