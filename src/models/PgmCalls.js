const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();
class PgmCalls {
  constructor(
    pgmID,
    pgmCls,
    name,
    callSeq,
    excPgm,
    clPgtyp,
    cldPgm,
    totChlcnt,
    rlvChlcnt,
    chlChlcnt,
    callID,
    callTyp,
    callTxt,
    callCls,
    pgmDir,
    cldDir,
    appNm
  ) {}

  async getDisplayPgms(DBname) {
    console.log(" into get Display pgms");
    const display = "D";

    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PGMCALLS WHERE REDFLAG != 'Y' AND CALLCLS = 'D' AND EXCPGM = ''`;
    //let query = `SELECT * FROM ${DBname}.PGMCALLS WHERE PGMID <> CLDPGM AND CALLCLS = 'D' AND EXCPGM = ''`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("rs ==", rs);
        console.log("getdisplay pgms fetched====", rs.length);
        resolve(rs);
      });
    });
  }

  async getDFDpgmPgms(pgmId, DBname) {
    console.log("into DFDpgm pgms==", pgmId);
    const display = "D";

    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PGMCALLS WHERE PGMID='${pgmId}' OR CLDPGM='${pgmId}' AND CALLCLS = 'D' AND EXCPGM = ''`;

    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getdfdpgmpgms fetched====", rs.length);
        resolve(rs);
      });
    });
  }
  //PGM DEFS


  async getWhereUsedPgms(pgmId, DBname) {
    const display = "D";
    var stmt = new connObj.db.dbstmt(connObj.dbconn);
    console.log(DBname);
    return new Promise((resolve, reject) => {
      let query = `SELECT pc.PGMID, pc.CLDPGM, pd.PGMTX, pd.PGMTYP  FROM ${DBname}.PGMCALLS pc INNER JOIN ${DBname}.PGMDEFS pd ON pc.CLDPGM = pd.PGMID
      WHERE pc.PGMID = '${pgmId}' AND pc.EXCPGM = '' UNION SELECT pc.PGMID, pc.CLDPGM, pd.PGMTX, pd.PGMTYP  FROM ${DBname}.PGMCALLS pc INNER JOIN ${DBname}.PGMDEFS pd ON pc.PGMID = pd.PGMID
      WHERE pc.CLDPGM = '${pgmId}' AND pc.EXCPGM = ''`
     
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getpgm list fetched====", rs.length);
        resolve(rs);
      });
    });
  }

  async getPgmList(DBname) {
    console.log("into getpgmlist");
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    return new Promise((resolve, reject) => {
      let query = `SELECT DISTINCT PGMID FROM ${DBname}.PgmCalls`;
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getpgm list fetched====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = PgmCalls;
