// @noflow because requires don't fit their types
import type { syno } from '../types/syno';
import type { functionCall } from '../types/syntactic-nodes/function-call.js'

const proxyNorCall: functionCall = require('../static/proxy-nor-call.yml');
const norCall: functionCall = require('../static/nor-call.yml');
const falseLiteral: functionCall = require('../static/false-literal.yml');

export default (name: ?string): syno => {
  switch (name) {
    case 'falseLiteral': {
      return falseLiteral;
    }
    case 'proxyNorCall': {
      return proxyNorCall;
    }
    case 'norCall': {
      return norCall;
    }
    default: {
      throw new Error('no graph map specified');
    }
  }
};
