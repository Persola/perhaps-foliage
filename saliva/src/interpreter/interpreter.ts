import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/syno';
import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import interpretFunctionCall from './syntype-interpreters/interpret-function-call';
import resolveRef from './resolve-ref';

import type { Scope } from '../types/interpreter/scope';
import type { FunctionCall } from '../types/synos/function-call';
import type { VariableRef } from '../types/synos/variable-ref';

const interpreter = (
  interpretee: Syno,
  scope: Scope,
  state: StateSelector,
): InterpretationResolution => {
  switch (interpretee.type) {
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
      const value = resolveRef(scope, (interpretee as VariableRef).referent);

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
