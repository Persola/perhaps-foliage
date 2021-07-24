import interpretFunctionCall from './syntype-interpreters/interpret-function-call';
import resolveRef from './resolve-ref';

import type { Syno } from '../../../types/syntactic/syno';
import type { Scope } from '../types/interpreter/scope';
import type { StateSelector } from '../../../types/state-selector';
import type { InterpretationResolution } from '../../../types/interpreter/interpretation-resolution';
import type { FunctionCall } from '../types/synos/function-call';
import type { VariableRef } from '../types/synos/variable-ref';

const interpreter = (
  interpretee: Syno,
  scope: Scope,
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
      return interpretFunctionCall(
        interpreter,
        scope,
        (interpretee as FunctionCall),
        state,
      );
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

      const value = resolveRef(scope, (interpretee as VariableRef).referent);

      if (typeof value !== 'object' || value.syntype !== 'booleanLiteral') {
        throw new Error(
          `Variable Reference with ID #'${interpretee.id}' resolved to an invalid value: ${value}`,
        );
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
