// @flow
import isBoolean from './is-boolean.js'
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars
import type { interpretationResolution } from '../../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars

const nor = (
  firstArg: booleanLiteral,
  secondArg: booleanLiteral
): booleanLiteral => {
  const resultValue = (!firstArg.value && !secondArg.value) ? true : false

  return {
    klass: 'booleanLiteral',
    value: resultValue
  }
}

export default (argumentz: booleanLiteral[]): interpretationResolution => {
  if (argumentz.length !== 2) {
    return {
      success: false,
      error: {message: `NOR recieved wrong number of arguments (${typeof argumentz.length} "${argumentz.length}" instead of 2)`}
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
