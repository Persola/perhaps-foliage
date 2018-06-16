// @noflow because requires don't fit their types
import type { syntacticGraph } from '../types/syntactic-graph';
import type { functionDefinition } from '../types/syntactic-nodes/function-definition.js'
import type { functionCall } from '../types/syntactic-nodes/function-call.js'

const proxyNorCall: functionCall = require('../static/proxy-nor-call.yml');
const norCall: functionCall = require('../static/nor-call.yml');

export default (name: ?string): syntacticGraph => {
  switch (name) {
    case 'proxyNorCall':
      return proxyNorCall;
    case 'norCall':
      return norCall;
    default:
      return defaultSeed;
  }
};
