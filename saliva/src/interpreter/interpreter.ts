import StateSelector from 'perhaps-foliage/dist/main-process/state-interface/state-selector';

import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import FunctionCall from '../synos/function-call';
import interpretFunctionCall from './syntype-interpreters/interpret-function-call';
import resolveRef from './resolve-ref';

import type { Scope } from '../types/interpreter/scope';
import type { SalivaType } from '../types/synos/saliva-type';

const interpreter = (
  interpretee: SalivaType,
  scope: Scope,
  state: StateSelector,
): InterpretationResolution => {
  switch (interpretee.type) {
    case 'booleanLiteral': {
      return {
        success: true,
        result: {
          synoMap: {
            1: JSON.parse(
              JSON.stringify(
                interpretee.raw,
              ),
            ),
          },
          inverseExtratreeEdges: {},
          rootId: '1',
          dependencies: [],
          lastId: 1,
        },
      };
    }

    case 'functionDefinition': {
      throw new Error('unimplemented: duplicate raw subtree');
      // return {
      //   success: true,
      //   result: 1,
      // };
    }

    case 'variableRef': {
      const value = resolveRef(scope, interpretee.followIntratreeRef('referent'));

      return {
        success: true,
        result: {
          synoMap: {
            1: JSON.parse(
              JSON.stringify(
                value,
              ),
            ),
          },
          inverseExtratreeEdges: {},
          rootId: '1',
          dependencies: [],
          lastId: 1,
        },
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

    default: {
      throw new Error('invalid syntactic node (unrecognized type)');
    }
  }
};

export default interpreter;
