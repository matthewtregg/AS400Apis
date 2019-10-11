const index = require("./index");
var connObj = {};
(function() {
  return new Promise(async (resolve, reject) => {
    connObj = await index.createDBConnection();
    resolve();
  });
})();

class Repository {
  constructor(dbname) {}

  async getdbList() {
    console.log("passd getdblist");
    var stmt = new connObj.db.dbstmt(connObj.dbconn);

    let query = `SELECT * FROM SPHOBJ.REPDEFS `;
    return new Promise((resolve, reject) => {
      stmt.exec(query, rs => {
        stmt.close();
        console.log("REPOSITORIES====", rs.length);
        resolve(rs);
      });
    });
  }
}

module.exports = Repository;
