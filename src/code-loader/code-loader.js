// @flow
import type { syntacticGraph } from '../types/syntactic-graph';

const syntaticGraphSeed: syntacticGraph = require('../syntactic-graph-seed.yml');

export default (): syntacticGraph => syntaticGraphSeed;
