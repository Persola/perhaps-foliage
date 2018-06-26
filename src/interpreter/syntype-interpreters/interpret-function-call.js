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

export default (
  interpreter: Function,
  parentScope: {},
  interpretee: FunctionCall,
  getSyno: Function
): InterpretationResolution => {
  const callee = getSyno(interpretee.callee);

  let resolvedCallee;
  if (callee.syntype === 'variableRef') {
    resolvedCallee = resolveRef(parentScope, callee.name);
  } else if (callee.syntype === 'functionDefinition') {
    resolvedCallee = callee;
  } else {
    throw new Error(`invalid function ref (returned syno of wrong syntype)`)
  }

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

  const ownScope = {};
  const paramNames = resolvedCallee.parameters.map(paramRef => getSyno(paramRef).name);
  paramNames.forEach(paramName => {
    const matchingPair = interpretedArgs.find(argRes => argRes[0].name === paramName);
    if (matchingPair === undefined) { throw new Error };
    ownScope[paramName] = matchingPair[1];
  });

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
      ownScope,
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
