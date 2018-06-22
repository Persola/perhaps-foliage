// @flow
import interpretFunctionCall from './syntype-interpreters/interpret-function-call.js'
import resolveRef from './resolve-ref.js'

import type { InterpretationResolution } from '../types/interpreter/interpretation-resolution'
import type { Syno } from '../types/syno'

const interpreter = (
  stagedSyno: Syno,
  scope: {},
  getSyno: Function
): InterpretationResolution => {
  switch (stagedSyno.syntype) {
    case 'booleanLiteral': {
      return {
        success: true,
        result: stagedSyno
      };
    }
    case 'functionCall': {
      return interpretFunctionCall(interpreter, scope, stagedSyno, getSyno);
    }
    case 'functionDefinition': {
      return {
        success: true,
        result: stagedSyno
      };
    }
    case 'variableRef': {
      // should check type
      const value = resolveRef(scope, stagedSyno.name);
      if ((typeof value) !== 'object') {
        throw new Error(`variable '${stagedSyno.name}' resolved wrong`);
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
