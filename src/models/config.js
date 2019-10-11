"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = {
  USE_MYSQL: 0,
  USE_DB2: 1,

  MYSQL_IMPORT: "mysql2",
  DB2_IMPORT: "/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a",

  DATABASE_NAME: "MVXD013S1", //'CUSD009',

  DB2_MBRLIST_LIB: "SPAOUT",
  DB2_MBRLIST_FILE: "SMBRLIST",

  DB2_SRCMBR_LIB: "SPAMSRC",
  DB2_SRCMBR_FILE: "APSRC",

  MYSQL_HOST: "localhost",
  MYSQL_PORT: 3306,
  MYSQL_USER: "root",
  MYSQL_PASSWORD: "sql12345",
  MYSQL_DATABASE: "custd009",

  DEBUG_LOG: false, // Creates Request and Response Log Entries
  AUTO_LOG: true, // Creates Access  Log Entries
  AUTO_LOG_ROTATION_INTERVAL: "1d", // rotate daily:ALTERNATIVES - '5s':rotates every X seconds- '5m':rotates every X minutes- '5h':rotates every X hours
  AUTO_LOG_ROTATION_SIZE: "10M", // Rotate Log when > Size :ALTERNATIVES 'B': Bites -'K': KiloBites - 'M': MegaBytes - 'G': GigaBytes

  SRC_FOLDER: __dirname + "/../src/",
  GRAMMAR_FOLDER: __dirname + "/../grammar/",
  COPYBOOKS_FOLDER: __dirname + "/../copy_dir/",
  SRC_FILES: __dirname + "/../src_files/"

  // AUTO_LVL: 1
};
