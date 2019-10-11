const index = require("./index");

var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();

class PgmSchema {
  constructor(
    pgmID,
    shortnm,
    rnmonly,
    len,
    decp,
    dtatyp,
    flddbcls,
    fldscncls,
    entID,
    viewID,
    ftxt,
    fseq,
    dirnm,
    appnm
  ) {}

  async getPgmSchemaDefList(pgmIds, DBname) {
    console.log("into getPgmschemadeflist==");
    let pgmIdValues = "(";
    pgmIds.forEach((id, index) => {
      if (index === 0) pgmIdValues += "'" + id + "'";
      else pgmIdValues += "," + "'" + id + "'";
    });
    pgmIdValues += ")";

    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PGMSCMDB WHERE PGMID IN ${pgmIdValues}`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched PGMSCHEMADEFLISTS====", rs.length);
        resolve(rs);
      });
    });
  }

  async getFileSchemaDefList(entIds, DBname) {
    console.log("into getFileschemadeflist==");
    let entIdValues = "(";
    entIds.forEach((id, index) => {
      if (index === 0) entIdValues += "'" + id + "'";
      else entIdValues += "," + "'" + id + "'";
    });
    entIdValues += ")";

    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PGMSCMDB WHERE ENTID IN ${entIdValues}`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getfileSCHEMADEFLISTS====", rs.length);
        resolve(rs);
      });
    });
  }

  //PGMDEFS
  async getFieldWhereUsed(fieldId, DBname) {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM ${DBname}.PGMSCMDB pb INNER JOIN ${DBname}.PGMDEFS pd ON pb.PGMID = pd.PGMID  
    WHERE pb.SHORTNM = '${fieldId}'`;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("fetched getFieldwhereused====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = PgmSchema;
