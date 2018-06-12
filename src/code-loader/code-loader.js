// @noflow because requires don't fit their types
import type { syntacticGraph } from '../types/syntactic-graph';
import type { functionDefinition } from '../types/syntactic-nodes/function-definition.js'
import type { functionCall } from '../types/syntactic-nodes/function-call.js'

const defaultSeed: functionCall = require('../static/syntactic-graph-seed.yml');
const proxyNorDef: functionDefinition = require('../static/proxy-nor-def.yml');
const proxyNorCall: functionCall = require('../static/proxy-nor-call.yml');

export default (name: ?string): syntacticGraph => {
  switch (name) {
    case 'proxyNorDef':
      return proxyNorDef;
    case 'proxyNorCall':
      return proxyNorCall;
    default:
      return defaultSeed;
  }
};
