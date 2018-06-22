// @flow
import interpretFunctionCall from './syntype-interpreters/interpret-function-call.js'
import resolveRef from './resolve-ref.js'

import type { InterpretationResolution } from '../types/interpreter/interpretation-resolution'
import type { Syno } from '../types/syno'

const interpreter = (
  interpretee: Syno,
  scope: {},
  getSyno: Function
): InterpretationResolution => {
  switch (interpretee.syntype) {
    case 'booleanLiteral': {
      return {
        success: true,
        result: interpretee
      };
    }
    case 'functionCall': {
      return interpretFunctionCall(interpreter, scope, interpretee, getSyno);
    }
    case 'functionDefinition': {
      return {
        success: true,
        result: interpretee
      };
    }
    case 'variableRef': {
      // should check type
      const value = resolveRef(scope, interpretee.name);
      if ((typeof value) !== 'object') {
        throw new Error(`variable '${interpretee.name}' resolved wrong`);
      }
      return {
        success: true,
        result: value
      };
    }
    default: {
      throw new Error('invalid syntactic node (unrecognized type)');
    }
  }
}

export default interpreter
