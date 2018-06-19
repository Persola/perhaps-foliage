// @flow
import resolveRef from '../resolve-ref.js'
import resolveAny from '../resolve-any.js'
import NOR_Primitive from './NOR-primitive.js'
import norPrimitiveId from '../../nor-primitive-id.js'
import type { interpretationResolution } from '../../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars
import type { synoMap } from '../../types/editor-state/syno-map' // eslint-disable-line no-unused-vars
import type { syno } from '../../types/syno' // eslint-disable-line no-unused-vars
import type { functionCall } from '../../types/syntactic-nodes/function-call' // eslint-disable-line no-unused-vars
import type { functionArgument } from '../../types/syntactic-nodes/function-argument' // eslint-disable-line no-unused-vars
import type { functionDefinition } from '../../types/syntactic-nodes/function-definition' // eslint-disable-line no-unused-vars
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars
import type { variableRef } from '../../types/syntactic-nodes/variable-ref' // eslint-disable-line no-unused-vars
import type { graphId } from '../../types/graph-id' // eslint-disable-line no-unused-vars

const interpretFunction = (
  interpreter: Function,
  parentScope: {},
  graphToInterpret: functionCall,
  getSyno: Function
): interpretationResolution => {
  // allow argumentz to be variableRef, resolve them using scope passed in
  const ownScope = {};

  let argumentz: {} = graphToInterpret.argumentz;
  let resolvedArguments;
  if (graphToInterpret.callee.id === norPrimitiveId) {
    (resolvedArguments: booleanLiteral[]) = resolveAny(parentScope, argumentz, getSyno); // eslint-disable-line no-unused-vars
  } else {
    (resolvedArguments: functionArgument[]) = resolveAny(parentScope, argumentz, getSyno); // eslint-disable-line no-unused-vars
  }

  if (graphToInterpret.callee.id === norPrimitiveId) {
    return NOR_Primitive(resolvedArguments);
  } else {
    const callee = getSyno(graphToInterpret.callee);
    let resolvedCallee;
    if (callee.syntype === 'variableRef') {
      resolvedCallee = resolveRef(callee);
    } else if (callee.syntype === 'functionDefinition') {
      resolvedCallee = callee;
    }

    if (resolvedCallee.syntype !== 'functionDefinition') {
      throw new Error(`invalid function ref (returned syno of wrong syntype)`);
    }

    const functionDefParameters = resolvedCallee.parameterz;
    const paramCount = Object.keys(functionDefParameters).length;
    const satisfiedParamCount = Object.keys(functionDefParameters).filter((paramSlotName: string) => {
      return Object.keys(resolvedArguments).includes(paramSlotName);
    }).length;

    if (satisfiedParamCount !== paramCount) {
      return {
        success: false,
        error: {message: `function "${resolvedCallee.name}" called with ${satisfiedParamCount} arguments (needs ${paramCount})`}
      };
    }

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