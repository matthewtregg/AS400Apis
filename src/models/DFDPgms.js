const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();
class DFDPgms {
  constructor() {}

  async getDFDPgmInfo(pgmId, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT pc.PGMID AS PGMID, pc.CLDPGM AS CLDPGM, pd.PGMTX  FROM ${DBname}.PGMCALLS pc INNER JOIN ${DBname}.PGMDEFS pd ON pc.CLDPGM = pd.PGMID
    WHERE pc.PGMID = '${pgmId}' AND pc.EXCPGM = '' AND pc.PGMID <> pc.CLDPGM UNION
    SELECT pc.PGMID AS PGMID, pc.CLDPGM AS CLDPGM, pd.PGMTX FROM ${DBname}.PGMCALLS pc INNER JOIN ${DBname}.PGMDEFS pd ON pc.PGMID = pd.PGMID
    WHERE pc.CLDPGM = '${pgmId}' AND pc.EXCPGM = '' AND pc.PGMID <> pc.CLDPGM`; 
    
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        //console.log(rs);
        console.log("fetched getDFDPgmInfo====", rs.length);
        resolve(rs);
      });
    });
  }


  async getDFDFileInfo(pgmId, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM ${DBname}.PGMFILES fl WHERE fl.PGMID = '${pgmId}'`;
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getDFD file info  fetched====", rs.length);
        resolve(rs);
      });
    });
  }

  async getCentralSchema(pgmId, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT  * FROM ${DBname}.PGMSCMDB db WHERE db.PGMID = '${pgmId}'`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log(rs);
        console.log("fetched getcentral schema====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = DFDPgms;
