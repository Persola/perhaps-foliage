// @flow
import type { booleanLiteral } from '../../types/syntactic-nodes/boolean-literal.js' // eslint-disable-line no-unused-vars
import type { booleanLiteralPres } from '../../types/presentations/boolean-literal.js' // eslint-disable-line no-unused-vars

export default (
  leBooleanLiteral: booleanLiteral,
  focusNodeId: (string | false)
): booleanLiteralPres => {
  const { value } = leBooleanLiteral
  let focused = (leBooleanLiteral.id === focusNodeId)
  return {
    klass: 'booleanLiteral',
    value,
    focused
  }
}
