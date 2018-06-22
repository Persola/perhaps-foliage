// @flow
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal.js'
import type { BooleanLiteralPres } from '../../../types/presentations/boolean-literal.js'

export default (
  booleanLiteral: BooleanLiteral,
  focusNodeId: (string | false)
): BooleanLiteralPres => {
  const { value } = booleanLiteral
  let focused = (booleanLiteral.id === focusNodeId)
  return {
    syntype: 'booleanLiteral',
    synoId: booleanLiteral.id,
    value,
    focused
  }
}
