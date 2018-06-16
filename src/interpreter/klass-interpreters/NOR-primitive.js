// @noflow
import isBoolean from './is-boolean.js'
import type { synoRef } from '../../types/syno-ref' // eslint-disable-line no-unused-vars
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

export default (argumentz: {}): interpretationResolution => {
  if (Object.values(argumentz).length !== 2) {
    return {
      success: false,
      error: {message: `NOR recieved wrong number of arguments (${typeof Object.values(argumentz).length} "${Object.values(argumentz).length}" instead of 2)`}
    }
  }

  const argValues = Object.values(argumentz);
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
