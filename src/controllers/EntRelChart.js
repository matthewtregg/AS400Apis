const EntRels = require("../models/EntRels");

const getEntRelChild = async (req, res) => {
  const ent = req.params.ent;
  const DBname = req.params.DBname;
  let entRels = new EntRels();
  // get children
  const entrels = await entRels.getEntRelChild(ent, DBname);

  const childIds = entrels.map(rel => rel.CHLD.trim());

  const otherRels = await entRels.getOtherRels(childIds);
  const children = entrels.filter(entID => {
    return entID.PAR.trim() === ent;
  });
  // left join
  for (rel of entrels) {
    if (children.includes(rel)) {
      rel.lastChild = false;
      const entrelTest = await entRels.getEntRelChild(rel.CHLD);
      if (entrelTest.length > 0) rel.lastChild = true;
    }
    rel.ButtonPressed = false;
  }
  res.send(JSON.stringify({ Error: false, data: [entrels, otherRels] }));
};

const getEntRelParent = async (req, res) => {
  const ent = req.params.ent;
  const DBname = req.params.DBname;
  let entRels = new EntRels();
  const entrels = await entRels.getEntRelParent(ent, DBname);
  const parentIds = entrels.map(rel => rel.PAR.trim());
  const otherRels = await entRels.getOtherRels(parentIds);
  const parents = entrels.filter(entID => entID.CHLD.trim() === ent);
  for (rel of entrels) {
    if (parents.includes(rel)) {
      rel.lastParent = false;
      const entrelTest = await entRels.getEntRelParent(rel.PAR);
      if (entrelTest.length > 0) rel.lastParent = true;
    }
    rel.ButtonPressed = false;
    //ADD ON IN FRONT END
  }
  res.send(JSON.stringify({ Error: false, data: [entrels, otherRels] }));
};

const getEntRelInfo = async (req, res) => {
  const ent = req.params.ent;
  const DBname = req.params.DBname;
  let entRels = new EntRels();
  const entrels = await entRels.getEntRel(ent, DBname);
  const children = entrels.filter(entID => {
    return entID.PAR.trim() === ent;
  });
  const parents = entrels.filter(entID => entID.CHLD.trim() === ent);
  const parentIds = entrels.map(rel => rel.PAR.trim());
  const childIds = entrels.map(rel => rel.CHLD.trim());

  let otherIds = parentIds.concat(childIds);
  otherIds = otherIds.filter(id => id !== ent);
  const otherRels = await entRels.getOtherRels(otherIds, DBname);
  for (rel of entrels) {
    if (children.includes(rel)) {
      rel.lastChild = false;
      const entrelTest = await entRels.getEntRelChild(rel.CHLD);
      if (entrelTest.length > 0) rel.lastChild = true;
    } else if (parents.includes(rel)) {
      rel.lastParent = false;
      const entrelTest = await entRels.getEntRelParent(rel.PAR);
      if (entrelTest.length > 0) rel.lastParent = true;
    }
    rel.ButtonPressed = false;
  }

  res.send(JSON.stringify({ Error: false, data: [entrels, otherRels] }));
};

const getEntRelData = async (req, res) => {
  //const entId = req.params.entId;
  const DBname = req.params.DBname;
  let entRels = new EntRels();
  const entrels = await entRels.getEntRels(DBname);
  res.send(JSON.stringify({ Error: false, data: entrels }));
};

module.exports = {
  getEntRelData,
  getEntRelInfo,
  getEntRelChild,
  getEntRelParent
};
