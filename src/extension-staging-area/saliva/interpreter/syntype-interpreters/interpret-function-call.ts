import primitives from '../../primitives.yml';
import interpretArgs from './interpret-function-call/interpret-args';
import norPrimitive from './interpret-function-call/nor-primitive';
import argumentParameterMismatch from '../../utils/argument-parameter-mismatch';

import type { Interpreter } from '../../types/interpreter/interpreter';
import type { Scope } from '../../types/interpreter/scope';
import type { StateSelector } from '../../../../types/state-selector';
import type { InterpretationResolution } from '../../../../types/interpreter/interpretation-resolution';
import type { FunctionCall } from '../../types/synos/function-call';
import type { Argument } from '../../types/synos/argument';
import type { BooleanLiteral } from '../../types/synos/boolean-literal';
import type { FunctionDefinition } from '../../types/synos/function-definition';

const primitiveIds = Object.keys(primitives);

const generateScope = (resolvedCallee, interpretedArgs, state): Scope => {
  const interpreteeScope = [];
  const params = resolvedCallee.parameters.map(paramRef => {
    const param = state.getSyno(paramRef.id);

    if (param.syntype !== 'functionParameter') {
      throw new Error('wrong type from synomap (flow)');
    }

    return param;
  });
  params.forEach(param => {
    const matchingPair = interpretedArgs.find(
      argRes => argRes[0].parameter && argRes[0].parameter.id === param.id,
    );

    if (matchingPair === undefined) {
      throw new Error();
    }

    interpreteeScope.push([param, matchingPair[1]]);
  });
  return interpreteeScope;
};

export default (
  interpreter: Interpreter,
  parentScope: Scope,
  interpretee: FunctionCall,
  state: StateSelector,
): InterpretationResolution => {
  if (!interpretee.callee) {
    return {
      success: false,
      error: {
        message: `function call (ID ${interpretee.id}) has no function reference`,
      },
    };
  }

  const callee = state.getSyno(interpretee.callee.id);
  // @ts-ignore: return type appears to be inferred incorrectly?
  const calleeResolution: InterpretationResolution = interpreter(callee, parentScope, state);

  if (!calleeResolution.success) {
    throw new Error(
      `callee resolution failed for function call of ID '${interpretee.id}'`,
    );
  }

  const resolvedCallee = calleeResolution.result;

  if (resolvedCallee.syntype !== 'functionDefinition') {
  // remove when typesafe
    throw new Error('invalid function ref (returned syno of wrong syntype)');
  }
  const functionDefinition = resolvedCallee as FunctionDefinition;

  if (!functionDefinition.body && !primitiveIds.includes(functionDefinition.id)) {
    return {
      success: false,
      error: {
        message: `function definition (ID ${functionDefinition.id}) has no body`,
      },
    };
  }

  const argumentz = interpretee.argumentz.map(argRef => {
    const arg = state.getSyno(argRef.id);

    if (arg.syntype !== 'argument') {
      throw new Error('wrong type from synomap (flow)');
    }

    return arg as Argument;
  });
  const argsMissingValues = argumentz.filter(
    (arg: Argument) => arg.value === null,
  );

  if (argsMissingValues.length > 0) {
    return {
      success: false,
      error: {
        message: `arguments (IDs ${argsMissingValues
          .map(a => a.id)
          .join(' ')}) ha(s/ve) no values`,
      },
    };
  }

  const argsMissingParameters = argumentz.filter(
    (arg: Argument) => !arg.parameter,
  );

  if (argsMissingParameters.length > 0) {
    return {
      success: false,
      error: {
        message:
     `arguments (IDs ${argsMissingParameters
       .map(a => a.id)
       .join(' ')}) ha(s/ve) no parameters`,
      },
    };
  }

  const interpretedArgs: [Argument, BooleanLiteral][] = interpretArgs(
    interpreter,
    parentScope,
    argumentz,
    state,
  );
  const apm: false | string = argumentParameterMismatch(
    functionDefinition,
    interpretedArgs.map(interpretedArg => interpretedArg[0]),
    state,
  );

  if (apm) {
    throw new Error(apm);
  }

  const interpreteeScope = generateScope(
    functionDefinition,
    interpretedArgs,
    state,
  );
  let functionResolution;

  if (primitiveIds.includes(interpretee.callee.id)) {
    interpretedArgs.forEach(argRes => {
      if (argRes[1].syntype !== 'booleanLiteral') {
        throw new Error();
      }
    });
    const argValues: BooleanLiteral[] = interpretedArgs.map(
      argRes => argRes[1],
    );
    functionResolution = norPrimitive(argValues);
  } else {
    functionResolution = interpreter(
      state.getSyno(functionDefinition.body.id),
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
      message: `function '${functionDefinition.name}' failed: \n${functionResolution.error.message}`,
    },
  };
};
