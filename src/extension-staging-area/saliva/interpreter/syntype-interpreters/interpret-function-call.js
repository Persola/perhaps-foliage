// @flow
import NorPrimitiveId from '../../nor-primitive-id.js'
import interpretArgs from './interpret-function-call/interpret-args'
import norPrimitive from './interpret-function-call/nor-primitive.js'
import argumentParameterMismatch from '../../utils/argument-parameter-mismatch'

import type { InterpretationResolution } from '../../types/interpreter/interpretation-resolution'
import type { FunctionCall } from '../../types/synos/function-call'
import type { Argument } from '../../types/synos/argument'
import type { BooleanLiteral } from '../../types/synos/boolean-literal'

const generateScope = (resolvedCallee, interpretedArgs, getSyno) => {
  const interpreteeScope = [];
  const params = resolvedCallee.parameters.map(paramRef => getSyno(paramRef));
  params.forEach(param => {
    const matchingPair = interpretedArgs.find(argRes => argRes[0].parameter && (argRes[0].parameter.id === param.id));
    if (matchingPair === undefined) { throw new Error }
    interpreteeScope.push([param, matchingPair[1]]);
  });

  return interpreteeScope;
};

export default (
  interpreter: Function,
  parentScope: [],
  interpretee: FunctionCall,
  getSyno: Function
): InterpretationResolution => {
  if (interpretee.callee === false) {
    return {
      success: false,
      error: {message: `function call (ID ${interpretee.id}) has no function reference`}
    }
  }

  const callee = getSyno(interpretee.callee);
  const calleeResolution = interpreter(callee, parentScope, getSyno);
  if (!calleeResolution.success) {
    throw new Error(`callee resolution failed for function call of ID '${interpretee.id}'`);
  }
  const resolvedCallee = calleeResolution.result;

  if (resolvedCallee.syntype !== 'functionDefinition') { // remove when typesafe
    throw new Error(`invalid function ref (returned syno of wrong syntype)`);
  }

  if (
    resolvedCallee.body === false &&
    resolvedCallee.id !== NorPrimitiveId
  ) {
    return {
      success: false,
      error: {message: `function definition (ID ${resolvedCallee.id}) has no body`}
    }
  }

  const argumentz = interpretee.argumentz.map(arg => getSyno(arg));

  const argsMissingValues = argumentz.filter((arg: Argument) => arg.value === false);
  if (argsMissingValues.length > 0) {
    return {
      success: false,
      error: {message: `arguments (IDs ${argsMissingValues.map(a => a.id).join(' ')}) ha(s/ve) no values`}
    }
  }

  const argsMissingParameters = argumentz.filter((arg: Argument) => arg.parameter === false);
  if (argsMissingParameters.length > 0) {
    return {
      success: false,
      error: {message: `arguments (IDs ${argsMissingParameters.map(a => a.id).join(' ')}) ha(s/ve) no parameters`}
    }
  }

  const interpretedArgs: [Argument, BooleanLiteral][] = interpretArgs(
    interpreter,
    parentScope,
    argumentz,
    getSyno
  );

  const apm: (string | false) = argumentParameterMismatch(
    resolvedCallee,
    interpretedArgs.map(interpretedArg => interpretedArg[0]),
    getSyno
  );
  if (apm) {
    throw new Error(apm);
  }

  const interpreteeScope = generateScope(resolvedCallee, interpretedArgs, getSyno);

  let functionResolution;
  if (interpretee.callee.id === NorPrimitiveId) {
    interpretedArgs.forEach(argRes => {
      if (argRes[1].syntype !== 'booleanLiteral') {
        throw new Error;
      }
    })
    const argValues: BooleanLiteral[] = interpretedArgs.map(argRes => argRes[1]);
    functionResolution = norPrimitive(argValues);
  } else {
    functionResolution = interpreter(
      getSyno(resolvedCallee.body),
      interpreteeScope,
      getSyno
    );
  }

  if (functionResolution.success) {
    return {
      success: true,
      result: functionResolution.result
    };
  } else {
    return {
      success: false,
      error: {message: `function '${resolvedCallee.name}' failed: \n${functionResolution.error.message}`}
    };
  }
}
