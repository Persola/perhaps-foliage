import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';

import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import version from '../../version';
import interpretArgs from './interpret-function-call/interpret-args';
import generateScope from './interpret-function-call/generate-scope';
import norPrimitive from './interpret-function-call/nor-primitive';
import argumentParameterMismatch from '../../utils/argument-parameter-mismatch';
import FunctionCall from '../../synos/function-call';
import Argument from '../../synos/argument';
import BooleanLiteral from '../../synos/boolean-literal';

import type { Interpreter } from '../../types/interpreter/interpreter';
import type { Scope } from '../../types/interpreter/scope';

export default (
  interpreter: Interpreter,
  parentScope: Scope,
  interpretee: FunctionCall,
  state: StateSelector,
): InterpretationResolution => {
  const callee = interpretee.callee();

  if (callee === null) {
    return {
      success: false,
      error: {
        message: `Function call (ID ${interpretee.id}) has no callee`,
      },
    };
  }

  const argumentz = interpretee.argumentz();

  const interpretedArgs: [Argument, BooleanLiteral][] = interpretArgs(
    interpreter,
    parentScope,
    argumentz,
    state,
  );

  const apm: false | string = argumentParameterMismatch(interpretee, callee);

  if (apm) {
    throw new Error(apm);
  }

  const interpreteeScope = generateScope(
    callee,
    interpretedArgs,
  );

  let functionResolution;

  if (callee.tree.id === `editor-instance.integrations.saliva.${version}.primitives`) {
    interpretedArgs.forEach(argRes => {
      if (argRes[1].type !== 'booleanLiteral') {
        throw new Error();
      }
    });
    const argValues: BooleanLiteral[] = interpretedArgs.map(
      argRes => argRes[1],
    );
    functionResolution = norPrimitive(argValues);
  } else {
    const bodyChildren = callee.children({ label: 'body' });

    if (bodyChildren.length === 0) {
      return {
        success: false,
        error: {
          message: `Non-primitive function definition (ID ${callee.id}) has no body`,
        },
      };
    }

    functionResolution = interpreter(
      bodyChildren[0],
      interpreteeScope,
      state,
    );
  }

  if (functionResolution.success) {
    return {
      success: true,
      result: functionResolution.result,
    };
  }

  return {
    success: false,
    error: {
      message: `function '${callee.attrs.name}' failed: \n${functionResolution.error.message}`,
    },
  };
};
