const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();
class PgmCode {
  constructor(
    pgmID,
    sttnum,
    linenum,
    stndate,
    stntyp,
    stn,
    opcode,
    lvlnum,
    stateid,
    ruleid,
    rlseq,
    ruletyp,
    optype,
    opcls,
    cmptor,
    mvar,
    svar1,
    svar2,
    svar3,
    svar4,
    filenm,
    invprnm,
    curprnm,
    keyseqno,
    prfl,
    bif,
    bifcls,
    dsnm,
    frompos,
    topos,
    len,
    decp,
    dtatyp,
    elem,
    mvardb,
    svar1db,
    svar2db,
    svar3db,
    svar4db,
    srcfile,
    srcdir,
    appnm
  ) {}

  async getPgmSource(pgmID, DBname) {
    console.log(" into pgmcode", pgmID, DBname);
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT PGMID, STN, MVAR, MVARDB FROM ${DBname}.PGMCODE WHERE PGMID = '${pgmID}'`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched PGMCODE====", rs.length);
        resolve(rs);
      });
    });
  }

  //PGM DEFS
  async getVarUsed(variable, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `select pc.PGMID as PgmID, pc.LINENUM as LineNum, pc.STN as Stn from ${DBname}.PGMCODE pc
      INNER JOIN ${DBname}.PGMDEFS pd ON pc.PGMID = pd.PGMID  
      WHERE pc.MVARDB='${variable}' OR pc.SVAR1DB='${variable}' OR pc.SVAR2DB='${variable}' OR pc.SVAR3DB='${variable}' OR pc.SVAR4DB='${variable}'
      `;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getvarused====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = PgmCode;
