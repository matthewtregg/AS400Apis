const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();

class DFDEnts {
  constructor() {}

  async getDFDEntInfo(entId, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT  * FROM ${DBname}.ENTRELS rel INNER JOIN ${DBname}.ENTITIES ent ON rel.PAR = ent.ENTID
    WHERE rel.PAR = '${entId}' UNION
    SELECT  * FROM ${DBname}.ENTRELS rel INNER JOIN ${DBname}.ENTITIES ent ON rel.CHLD = ent.ENTID
    WHERE rel.CHLD = '${entId}' ;`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getEntDefList====", rs.length);
        resolve(rs);
      });
    });
  }
  async getDFDPgmInfo(entId, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT  * FROM ${DBname}.PGMFILES fl WHERE fl.ENTID = '${entId}'`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getDFDPgm Info====", rs.length);
        resolve(rs);
      });
    });
  }

  async getCentralSchema(entId, DBname) {
    console.log("into central scema of DFDEnts", entID);
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT  * FROM ${DBname}.PGMSCMDB db WHERE db.ENTID = '${entId}'`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getCentralSchema====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = DFDEnts;
