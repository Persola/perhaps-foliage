// @flow
type syntacticGraph = Object

const syntaticGraphSeed: syntacticGraph = require("../syntactic-graph-seed.yml");

export default (): syntacticGraph => { return syntaticGraphSeed; }
