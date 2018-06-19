// @flow
import isBoolean from './is-boolean.js'
import type { syno } from '../../types/syno' // eslint-disable-line no-unused-vars
import type { synoRef } from '../../types/syno-ref' // eslint-disable-line no-unused-vars
import type { booleanLiteralAttrs } from '../../types/syntactic-nodes/syno-attrs/boolean-literal-attrs' // eslint-disable-line no-unused-vars
import type { interpretationResolution } from '../../types/interpreter/interpretation-resolution' // eslint-disable-line no-unused-vars

const nor = (
  firstArg: booleanLiteralAttrs,
  secondArg: booleanLiteralAttrs
): booleanLiteralAttrs => {
  const resultValue = (firstArg.value || secondArg.value) ? false : true

  return {
    syntype: 'booleanLiteral',
    value: resultValue
  }
}

export default (argumentz: {[string]: syno}): interpretationResolution => {
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
