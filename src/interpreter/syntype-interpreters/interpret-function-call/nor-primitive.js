// @flow
import isBoolean from './is-boolean.js'
import typedValues from '../../../flow-pacifiers/typed-values'

import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal'
import type { BooleanLiteralAttrs } from '../../../types/syntactic-nodes/syno-attrs/boolean-literal-attrs'
import type { InterpretationResolution } from '../../../types/interpreter/interpretation-resolution'

const nor = (
  firstArg: (BooleanLiteral | BooleanLiteralAttrs),
  secondArg: (BooleanLiteral | BooleanLiteralAttrs)
): BooleanLiteral => {
  const resultValue = (firstArg.value || secondArg.value) ? false : true

  return {
    id: `interpResult-${String(Math.random()).substring(2)}`,
    parent: false,
    syntype: 'booleanLiteral',
    value: resultValue
  }
}

export default (argumentz: any): InterpretationResolution => {
  if (Object.values(argumentz).length !== 2) {
    return {
      success: false,
      error: {message: `NOR recieved wrong number of arguments (${typedValues(argumentz).length} instead of 2)`}
    }
  }

  const argValues = typedValues(argumentz);

  if (
    (!isBoolean(argValues[0])) ||
    (!isBoolean(argValues[1]))
  ) {
    const badArg = !isBoolean(argValues[0]) ? isBoolean(argValues[0]) : isBoolean(argValues[1])
    return {
      success: false,
      error: {message: `NOR recieved non-boolean argument '${String(badArg)}' (${typeof badArg})`}
    }
  }

  return {
    success: true,
    result: nor(argValues[0], argValues[1])
  };
}
