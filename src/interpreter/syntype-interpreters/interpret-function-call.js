// @flow
import resolveRef from '../resolve-ref.js'
import NorPrimitiveId from '../../nor-primitive-id.js'
import throwIfParametersUnsatisfied from './interpret-function-call/throw-if-parameters-unsatisfied'
import interpretArgs from './interpret-function-call/interpret-args'
import norPrimitive from './interpret-function-call/nor-primitive.js'

import type { InterpretationResolution } from '../../types/interpreter/interpretation-resolution'
import type { FunctionCall } from '../../types/syntactic-nodes/function-call'
import type { Argument } from '../../types/syntactic-nodes/argument'
import type { BooleanLiteral } from '../../types/syntactic-nodes/boolean-literal'

const generateScope = (resolvedCallee, interpretedArgs, getSyno) => {
  const interpreteeScope = {};
  const params = resolvedCallee.parameters.map(paramRef => getSyno(paramRef));
  params.forEach(param => {
    const matchingPair = interpretedArgs.find(argRes => argRes[0].name === param.name);
    if (matchingPair === undefined) { throw new Error };
    interpreteeScope[param.name] = matchingPair[1];
  });

  return interpreteeScope;
};

export default (
  interpreter: Function,
  parentScope: {},
  interpretee: FunctionCall,
  getSyno: Function
): InterpretationResolution => {
  const callee = getSyno(interpretee.callee);
  const calleeResolution = interpreter(callee);
  if (!calleeResolution.success) {
    throw new Error(`callee resolution failed for function call of ID '${interpretee.id}'`);
  }
  const resolvedCallee = calleeResolution.result;

  if (resolvedCallee.syntype !== 'functionDefinition') { // remove when typesafe
    throw new Error(`invalid function ref (returned syno of wrong syntype)`);
  }

  const interpretedArgs: [Argument, BooleanLiteral][] = interpretArgs(
    interpreter,
    parentScope,
    interpretee.argumentz,
    getSyno
  );

  throwIfParametersUnsatisfied(resolvedCallee, interpretedArgs, getSyno);

  const interpreteeScope = generateScope(resolvedCallee, interpretedArgs, getSyno);

  let functionResolution;
  if (interpretee.callee.id === NorPrimitiveId) {
    interpretedArgs.forEach(argRes => {
      if (argRes[1].syntype !== 'booleanLiteral') {
        throw new Error;
      }
    })
    functionResolution = norPrimitive(interpretedArgs.map(argRes => argRes[1]));
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
