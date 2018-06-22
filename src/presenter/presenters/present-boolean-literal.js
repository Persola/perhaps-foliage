// @flow
import type { BooleanLiteral } from '../../types/syntactic-nodes/boolean-literal.js' // eslint-disable-line no-unused-vars
import type { BooleanLiteralPres } from '../../types/presentations/boolean-literal.js' // eslint-disable-line no-unused-vars

export default (
  leBooleanLiteral: BooleanLiteral,
  focusNodeId: (string | false)
): BooleanLiteralPres => {
  const { value } = leBooleanLiteral
  let focused = (leBooleanLiteral.id === focusNodeId)
  return {
    syntype: 'booleanLiteral',
    synoId: leBooleanLiteral.id,
    value,
    focused
  }
}
