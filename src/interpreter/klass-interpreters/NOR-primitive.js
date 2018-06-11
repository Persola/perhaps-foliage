// @flow
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal' // eslint-disable-line no-unused-vars

export default (
  firstArg: booleanLiteral,
  secondArg: booleanLiteral
): booleanLiteral => {
  const resultValue = (!firstArg.value && !secondArg.value) ? true : false

  return {
    klass: 'booleanLiteral',
    value: resultValue
  }
}
