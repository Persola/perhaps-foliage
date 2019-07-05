// @flow
import interpretFunctionCall from './syntype-interpreters/interpret-function-call.js'
import resolveRef from './resolve-ref.js'
import dup from '../syntree-utils/dup.js'

import type { InterpretationResolution } from '../types/interpreter/interpretation-resolution'
import type { Syno } from '../types/syno'

const interpreter = (
  interpretee: Syno,
  scope: [],
  getSyno: Function
): InterpretationResolution => {
  switch (interpretee.syntype) {
    case 'booleanLiteral': {
      // should dup?
      return {
        success: true,
        result: dup(interpretee)
      };
    }
    case 'functionCall': {
      return interpretFunctionCall(interpreter, scope, interpretee, getSyno);
    }
    case 'functionDefinition': {
      // should dup?
      return {
        success: true,
        result: dup(interpretee)
      };
    }
    case 'variableRef': {
      // should dup?
      // should check type
      if (interpretee.referent === false) {
        return {
          success: false,
          error: {message: `variableRef (ID ${interpretee.id}) has no referent`}
        }
      }

      const value = resolveRef(scope, interpretee.referent);
      if ((typeof value) !== 'object') {
        throw new Error(`variable at '${interpretee.id}' resolved wrong`);
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
