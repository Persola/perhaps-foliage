// @flow
import resolveRef from '../resolve-ref.js'
import resolveAny from '../resolve-any.js'
import NOR_Primitive from './NOR-primitive.js'
import norPrimitiveId from '../../nor-primitive-id.js'
import typedValues from '../../flow-pacifiers/typed-values'

import type { interpretationResolution } from '../../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { synoMap } from '../../types/editor-state/syno-map' // eslint-disable-line no-unused-vars
import type { syno } from '../../types/syno' // eslint-disable-line no-unused-vars
import type { literalValue } from '../../types/syntactic-nodes/literal-value' // eslint-disable-line no-unused-vars
import type { functionCall } from '../../types/syntactic-nodes/function-call' // eslint-disable-line no-unused-vars
import type { functionArgument } from '../../types/syntactic-nodes/function-argument' // eslint-disable-line no-unused-vars
import type { functionDefinition } from '../../types/syntactic-nodes/function-definition' // eslint-disable-line no-unused-vars
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars
import type { booleanLiteralAttrs } from '../../types/syntactic-nodes/syno-attrs/boolean-literal-attrs' // eslint-disable-line no-unused-vars
import type { variableRef } from '../../types/syntactic-nodes/variable-ref' // eslint-disable-line no-unused-vars
import type { graphId } from '../../types/graph-id' // eslint-disable-line no-unused-vars

const throwIfParametersUnsatisfied = (functionDefParameters, resolvedArguments, resolvedCallee) => {
  const paramSlots = Object.keys(functionDefParameters);
  const argSlots = Object.keys(resolvedArguments);
  const unsatisfiedParamSlots = paramSlots.filter((paramSlot: string) => {
    return !argSlots.includes(paramSlot);
  });
  const extraArgSlots = argSlots.filter((argSlot: string) => {
    return !paramSlots.includes(argSlot);
  });

  if (new Set(argSlots) !== new Set(paramSlots)) {
    return {
      success: false,
      error: {message: `function "${resolvedCallee.name}" called with wrong parameters (unsatisfied: ${unsatisfiedParamSlots.join(', ')}; extra: ${extraArgSlots.join(', ')})`}
    };
  }
};

const interpretFunction = (
  interpreter: Function,
  parentScope: {},
  graphToInterpret: functionCall,
  getSyno: Function
): interpretationResolution => {
  // allow argumentz to be variableRef, resolve them using scope passed in
  const ownScope = {};

  let argumentz: {} = graphToInterpret.argumentz;
  const resolvedArguments: {[string]: literalValue} = resolveAny(parentScope, argumentz, getSyno); // eslint-disable-line no-unused-vars

  if (graphToInterpret.callee.id === norPrimitiveId) {
    typedValues(resolvedArguments).forEach(resArg => {
      if (resArg.syntype !== 'booleanLiteral') {
        throw new Error;
      }
    })
    return NOR_Primitive(resolvedArguments);
  } else {
    const callee = getSyno(graphToInterpret.callee);
    let resolvedCallee;
    if (callee.syntype === 'variableRef') {
      resolvedCallee = resolveRef(parentScope, callee.name);
    } else if (callee.syntype === 'functionDefinition') {
      resolvedCallee = callee;
    } else { throw new Error }

    if (resolvedCallee.syntype !== 'functionDefinition') {
      throw new Error(`invalid function ref (returned syno of wrong syntype)`);
    }

    const functionDefParameters = resolvedCallee.parameterz;

    throwIfParametersUnsatisfied(
      functionDefParameters,
      resolvedArguments,
      resolvedCallee
    );

    Object.keys(functionDefParameters).forEach(slotName => {
      ownScope[slotName] = resolvedArguments[slotName];
    });

    const functionResolution = interpreter(
      getSyno(resolvedCallee.body),
      ownScope,
      getSyno
    );

    if (functionResolution.success) {
      return {
        success: true,
        result: functionResolution.result
      };
    } else {
      return {
        success: false,
        error: {message: 'function failed'}
      };
    }
  }
}

export default interpretFunction
