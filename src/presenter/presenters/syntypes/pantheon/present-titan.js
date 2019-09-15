// @flow
import presentSyno from '../../present-syno.js'

import type { Titan } from '../../../../types/syntactic-nodes/pantheon/titan.js'
import type { TitanPresAttrs } from '../../../../types/presentations/presno-attrs/pantheon/titan-attrs'
import type { PresnoMap } from '../../../../types/presentations/presno-map.js'
import type { PresnoRef } from '../../../../types/presentations/presno-ref.js'
import type { SynoId } from '../../../../types/syno-id.js'
import type { Focus } from '../../../../types/editor-state/focus.js'
import type { Grammar } from '../../types/editor-state/grammar.js'
export default (
  grammar: Grammar,
  presnoMap: PresnoMap,
  titan: Titan,
  scope: Object,
  getSyno: Function,
  focus: (Focus | false)
): TitanPresAttrs => {
  return {
    syntype: 'titan',
    name: titan.name,
    child: {
      presnoRef: true,
      id: presentSyno(
        grammar,
        presnoMap,
        titan.id,
        getSyno(titan.child),
        scope,
        getSyno,
        focus
      )
    },
    focused: focus && (titan.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (titan.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (titan.id === focus.synoId) && focus.charIndex,
    valid: true
  }
}
