// @flow
import resolveRef from '../resolve-ref.js'
import NorPrimitiveId from '../../nor-primitive-id.js'
import typedValues from '../../flow-pacifiers/typed-values'
import throwIfParametersUnsatisfied from './interpret-function-call/throw-if-parameters-unsatisfied'
import interpretArgs from './interpret-function-call/interpret-args'
import NOR_Primitive from './interpret-function-call/NOR-primitive.js'

import type { InterpretationResolution } from '../../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { FunctionCall } from '../../types/syntactic-nodes/function-call' // eslint-disable-line no-unused-vars

export default (
  interpreter: Function,
  parentScope: {},
  graphToInterpret: FunctionCall,
  getSyno: Function
): InterpretationResolution => {
  const ownScope = {};
  const callee = getSyno(graphToInterpret.callee);

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

  const interpretedArgs = interpretArgs(
    interpreter,
    parentScope,
    graphToInterpret.argumentz,
    getSyno
  );

  throwIfParametersUnsatisfied(resolvedCallee, interpretedArgs);

  Object.keys(resolvedCallee.parameterz).forEach(slotName => {
    ownScope[slotName] = interpretedArgs[slotName];
  });

  let functionResolution;
  if (graphToInterpret.callee.id === NorPrimitiveId) {
    typedValues(interpretedArgs).forEach(resArg => {
      if (resArg.syntype !== 'booleanLiteral') {
        throw new Error;
      }
    })
    functionResolution = NOR_Primitive(interpretedArgs);
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
