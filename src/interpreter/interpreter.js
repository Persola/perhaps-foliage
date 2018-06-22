// @flow
import interpretFunctionCall from './syntype-interpreters/interpret-function-call.js'
import resolveRef from './resolve-ref.js'

import type { InterpretationResolution } from '../types/interpreter/interpretation-resolution'
import type { Syno } from '../types/syno'

const interpreter = (
  syno: Syno,
  scope: {},
  getSyno: Function
): InterpretationResolution => {
  switch (syno.syntype) {
    case 'booleanLiteral': {
      return {
        success: true,
        result: syno
      };
    }
    case 'functionCall': {
      return interpretFunctionCall(interpreter, scope, syno, getSyno);
    }
    case 'functionDefinition': {
      return {
        success: true,
        result: syno
      };
    }
    case 'variableRef': {
      // should check type
      const value = resolveRef(scope, syno.name);
      if ((typeof value) !== 'object') {
        throw new Error(`variable '${syno.name}' resolved wrong`);
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
