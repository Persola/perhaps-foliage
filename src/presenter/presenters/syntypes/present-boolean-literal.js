// @flow
import type { BooleanLiteral } from '../../../types/syntactic-nodes/boolean-literal.js'
import type { BooleanLiteralPresAttrs } from '../../../types/presentations/presno-attrs/boolean-literal-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { Focus } from '../../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  booleanLiteral: BooleanLiteral,
  focus: (Focus | false)
): BooleanLiteralPresAttrs => {
  const { value } = booleanLiteral
  return {
    syntype: 'booleanLiteral',
    value,
    focused: focus && (booleanLiteral.id === focus.synoId),
    presnoFocused: false, // can't edit name
    charFocused: false // can't edit name
  }
}
