import interpretFunctionCall from './syntype-interpreters/interpret-function-call';
import resolveRef from './resolve-ref';
import type { StateSelector } from '../../../types/state-selector';
import type { Syno } from '../../../types/syno';
import type { InterpretationResolution } from '../../../types/interpreter/interpretation-resolution';

const interpreter = (
  interpretee: Syno,
  scope: [],
  state: StateSelector,
): InterpretationResolution => {
  switch (interpretee.syntype) {
    case 'booleanLiteral': {
      return {
        success: true,
        result: interpretee,
      };
    }

    case 'functionCall': {
      return interpretFunctionCall(interpreter, scope, interpretee, state);
    }

    case 'functionDefinition': {
      return {
        success: true,
        result: interpretee,
      };
    }

    case 'variableRef': {
      if (!interpretee.referent) {
        return {
          success: false,
          error: {
            message: `variableRef (ID ${interpretee.id}) has no referent`,
          },
        };
      }

      const value = resolveRef(scope, interpretee.referent);

      if (typeof value !== 'object') {
        throw new Error(`variable at '${interpretee.id}' resolved wrong`);
      }

      return {
        success: true,
        result: value,
      };
    }

    default: {
      throw new Error('invalid syntactic node (unrecognized type)');
    }
  }
};

export default interpreter;
