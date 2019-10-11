const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();
class EntRels {
  constructor(
    rlnID,
    rlnTp,
    rtxt,
    par,
    parSeq,
    chld,
    chldSeq,
    parnm,
    chldnm,
    pardir,
    chlddir,
    appNm
  ) {}

  async getOtherRels(entArray, DBname) {
    console.log("into getOtherrels");
    let arrayItems = "(";
    entArray.forEach((id, index) => {
      if (index === 0) arrayItems += "'" + id + "'";
      else arrayItems += "," + "'" + id + "'";
    });
    arrayItems += ")";
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.ENTRELS WHERE PAR IN ${arrayItems} AND CHLD IN ${arrayItems} AND PAR <> CHLD`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getOtherRels====", rs.length);
        resolve(rs);
      });
    });
  }

  async getEntRels(DBname) {
    console.log("into getentrels ");

    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.ENTRELS WHERE PAR<> CHLD`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getEntRels====", rs.length);
        resolve(rs);
      });
    });
  }

  async getEntRel(ent, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.ENTRELS WHERE PAR = ${ent} OR CHLD = ${ent} AND PAR <> CHLD`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getEntRel====", rs.length);
        resolve(rs);
      });
    });
  }
  // get children
  async getEntRelChild(ent, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.ENTRELS WHERE PAR = ${ent} AND PAR <> CHLD`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getEntRelChild====", rs.length);
        resolve(rs);
      });
    });
  }
  async getEntRelParent(ent, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.ENTRELS WHERE CHLD = ${ent} AND PAR <> CHLD`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("getEntRelParent====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = EntRels;
