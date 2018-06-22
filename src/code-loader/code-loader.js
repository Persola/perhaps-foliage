// @noflow because requires don't fit their types
import type { syno } from '../types/syno';
import type { functionCall } from '../types/syntactic-nodes/function-call.js'

const primitives: functionCall = require('../static/primitives.yml');
const falseLiteral: functionCall = require('../static/false-literal.yml');
const proxyNorCall: functionCall = require('../static/proxy-nor-call.yml');
const norCall: functionCall = require('../static/nor-call.yml');
const norDef: functionCall = require('../static/nor-def.yml');
const orCall: functionCall = require('../static/or-call.yml');

export default (name: ?string): syno => {
  switch (name) {
    case 'primitives': {
      return primitives;
    }
    case 'falseLiteral': {
      return falseLiteral;
    }
    case 'proxyNorCall': {
      return proxyNorCall;
    }
    case 'norCall': {
      return norCall;
    }
    case 'norDef': {
      return norDef;
    }
    case 'orCall': {
      return orCall;
    }
    default: {
      throw new Error('requested syntactic map does not exist');
    }
  }
};
