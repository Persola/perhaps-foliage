import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';

import type { Interpreter } from '../../../types/interpreter/interpreter';
import type { Scope } from '../../../types/interpreter/scope';
import type { Argument } from '../../../types/synos/argument';
import type { BooleanLiteral } from '../../../types/synos/boolean-literal';

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

    if (!arg.attrs.value) {
      throw new Error(`Unassigned argument of ID ${arg.id}`);
    }

    const argResolution = interpreter(
      state.getSyno(arg.value.id),
      parentScope,
      state,
    );

    if (argResolution.success) {
      interpretedArgs.push([
        arg,
        argResolution.result as BooleanLiteral,
      ]);
    } else {
      throw new Error('arg interp failed');
    }
  });

  return interpretedArgs;
};
