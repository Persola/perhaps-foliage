// @flow
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal.js'
import type { BooleanLiteralPresAttrs } from '../../../types/presentations/presno-attrs/boolean-literal-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'

export default (
  presnoMap: PresnoMap,
  booleanLiteral: BooleanLiteral,
  focusNodeId: (string | false)
): BooleanLiteralPresAttrs => {
  const { value } = booleanLiteral
  let focused = (booleanLiteral.id === focusNodeId)
  return {
    syntype: 'booleanLiteral',
    value,
    focused
  }
}
