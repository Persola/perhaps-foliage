import StateSelector from 'perhaps-foliage/dist/main-process/state-interface/state-selector';
import type { InterpretationResolutionFailure } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution-failure';

import Argument from '../../../synos/argument';
import BooleanLiteral from '../../../synos/boolean-literal';

import type { Interpreter } from '../../../types/interpreter/interpreter';
import type { Scope } from '../../../types/interpreter/scope';
import type { Expression } from '../../../types/synos/expression';

export default (
  interpreter: Interpreter,
  parentScope: Scope,
  argumentz: Argument[],
  state: StateSelector,
): [Argument, BooleanLiteral][] => {
  const interpretedArgs: [Argument, BooleanLiteral][] = [];

  argumentz.forEach((arg: Argument) => {
    if (arg.type !== 'argument') {
      throw new Error(`Expected argument, got ${arg.type}`);
    }

    const value: Expression = arg.value();

    if (!value) {
      throw new Error(`Unassigned argument of ID ${arg.id}`);
    }

    const argResolution = interpreter(
      value,
      parentScope,
      state,
    );

    if (argResolution.success) {
      interpretedArgs.push([
        arg,
        argResolution.result.synoMap['1'] as BooleanLiteral,
      ]);
    } else {
      const errorMessage = (argResolution as InterpretationResolutionFailure).error.message;
      throw new Error(`Argument interpretation failed: ${errorMessage}`);
    }
  });

  return interpretedArgs;
};
