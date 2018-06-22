// @noflow because requires don't fit their types
import type { Syno } from '../types/syno';
import type { FunctionCall } from '../types/syntactic-nodes/function-call.js'

const primitives: FunctionCall = require('../static/primitives.yml');
const falseLiteral: FunctionCall = require('../static/false-literal.yml');
const proxyNorCall: FunctionCall = require('../static/proxy-nor-call.yml');
const norCall: FunctionCall = require('../static/nor-call.yml');
const norDef: FunctionCall = require('../static/nor-def.yml');
const orCall: FunctionCall = require('../static/or-call.yml');

export default (name: ?string): Syno => {
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
