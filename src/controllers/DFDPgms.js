const DFDPgms = require("../models/DFDPgms");
const DFDEnts = require("../models/DFDEnts");

// needs refactoring
// make back end non-blocking
const getDFDPgmPgmInfo = async (req, res) => {
  const DBname = req.params.DBname;
  const pgmId = req.params.pgmId;
  console.log("into DFDPGMPGMInfo");
  const DFDpgms = new DFDPgms();

  DFDpgms.getDFDPgmInfo(pgmId, DBname).then(DFDPgmInfo => {
    res.send(
      JSON.stringify({
        Error: false,
        data: {
          DFDPgmInfo: [DFDPgmInfo]
        }
      })
    );
  });
};

const getDFDPgmFileInfo = async (req, res) => {
  const pgmId = req.params.pgmId;
  const DBname = req.params.DBname;
  const DFDpgms = new DFDPgms();
  DFDpgms.getDFDFileInfo(pgmId, DBname).then(DFDFileInfo => {
    res.send(JSON.stringify({ Error: false, data: DFDFileInfo }));
  });
};

const getDFDPgmCentralInfo = async (req, res) => {
  const pgmId = req.params.pgmId;
  const DBname = req.params.DBname;
  const DFDpgms = new DFDPgms();
  DFDpgms.getCentralSchema(pgmId, DBname).then(centralSchema => {
    res.send(JSON.stringify({ Error: false, data: centralSchema }));
  });
};

//DFDPgmInfo":DFDPgmInfo[0], "DFDEntInfo":DFDFileInfo[0],"centralSchema":centralSchema[0]

const getDFDFilePgmInfo = async (req, res) => {
  const DBname = req.params.DBname;
  const viewId = req.params.viewId;
  const entRels = new DFDEnts();
  entRels.getDFDPgmInfo(viewId, DBname).then(DFDPgmInfo => {
    res.send(JSON.stringify({ Error: false, data: DFDPgmInfo[0] }));
  });
};

const getDFDFileFileInfo = async (req, res) => {
  const entId = req.params.entId;
  const DBname = req.params.DBname;
  const entRels = new DFDEnts();
  entRels.getDFDEntInfo(entId, DBname).then(DFDFileInfo => {
    res.send(JSON.stringify({ Error: false, data: DFDFileInfo[0] }));
  });
};

const getDFDFileCentralInfo = async (req, res) => {
  const entId = req.params.entId;
  const DBname = req.params.DBname;
  const entRels = new DFDEnts();
  entRels.getCentralSchema(entId, DBname).then(centralSchema => {
    res.send(JSON.stringify({ Error: false, data: centralSchema[0] }));
  });
};

// schema information

module.exports = {
  getDFDFilePgmInfo,
  getDFDFileFileInfo,
  getDFDFileCentralInfo,
  getDFDPgmPgmInfo,
  getDFDPgmFileInfo,
  getDFDPgmCentralInfo
};

//WhereUsed api ends here
