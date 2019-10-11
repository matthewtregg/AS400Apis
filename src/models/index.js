var config = require("./config");

function createDB2Conn() {
  return new Promise((resolve, reject) => {
    const db = require(config.default.DB2_IMPORT);
    const dbconn = new db.dbconn();
    dbconn.conn("*LOCAL");

    var connObj = {};
    connObj.db = db;
    connObj.dbconn = dbconn;

    console.log("============= DB2 connection established ==============");

    resolve(connObj);
  });
}

function executeQueryDB2WithoutNC(connObj) {
  return new Promise((resolve, reject) => {
    var stmt = new connObj.db.dbstmt(connObj.dbconn);
    stmt.exec(`${connObj.query}`, function (results, err) {
      if (err) {
        console.log({
          Error: true,
          Message: `${err}`,
          Query: `${connObj.query}`
        });
      } else {
        stmt.close();
        resolve(results);
      }
    });
  });
}

function executeQuery(connObj) {
  return new Promise((resolve, reject) => {
    console.log('Invoked index.executeQuery');
    var stmt = new connObj.db.dbstmt(connObj.dbconn);
    stmt.exec(`${connObj.query} WITH NC`, async function (results, err) {
      if (err) {
        console.log({
          'Error': true,
          'Message': `${err}`,
          'Query': `${connObj.query}`
        })

        resolve();
      } else {
        console.log('Query result:', results);
        stmt.close();
        stmt = null;
        resolve(results);
      }
    });
  });
}

function createDBConnection() {
  return new Promise(async (resolve, reject) => {
    var connObj = {};
    if (config.default.USE_MYSQL) {
      connObj = await createMySQLConn();
      resolve(connObj);
    } else if (config.default.USE_DB2) {
      connObj = await createDB2Conn();

      resolve(connObj);
    } else {
      console.log("Please set Database Preference in config.js");
      resolve(false);
    }
  });
}

function disconnectDBConnection(connObj) {
  return new Promise((resolve, reject) => {
    if (config.default.USE_MYSQL) {
      connObj.db.end();

      console.log("============= MySQL connection disconnected ==============");
      resolve();
    } else if (config.default.USE_DB2) {
      connObj.dbconn.disconn();
      connObj.dbconn.close();

      console.log("============= DB2 connection disconnected ==============");
      resolve();
    }
  });
}

module.exports = {
  createDBConnection,
  executeQuery,
  executeQueryDB2WithoutNC,
  disconnectDBConnection
};