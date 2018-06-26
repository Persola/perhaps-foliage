// @flow
import isBoolean from './is-boolean.js'

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
  if (argumentz.length !== 2) {
    return {
      success: false,
      error: {message: `NOR recieved wrong number of arguments (${argumentz.length} instead of 2)`}
    }
  }

  if (
    (!isBoolean(argumentz[0])) ||
    (!isBoolean(argumentz[1]))
  ) {
    const badArg = !isBoolean(argumentz[0]) ? isBoolean(argumentz[0]) : isBoolean(argumentz[1])
    return {
      success: false,
      error: {message: `NOR recieved non-boolean argument '${String(badArg)}' (${typeof badArg})`}
    }
  }

  return {
    success: true,
    result: nor(argumentz[0], argumentz[1])
  };
}
