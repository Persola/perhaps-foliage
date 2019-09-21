// @flow
import presentSyno from '../../../presenter/presenters/present-syno.js'

import type { SynoId } from '../../../types/syno-id.js'
import type { PresnoMap } from '../../../types/presenter/presno-map.js'
import type { PresnoRef } from '../../../types/presenter/presno-ref.js'
import type { Focus } from '../../../types/editor-state/focus.js'
import type { GrammarName } from '../../../types/editor-state/grammar-name.js'
import type { Titan } from '../types/synos/titan.js'
import type { TitanPres } from '../types/presentations/titan'

export default (
  grammar: GrammarName,
  presnoMap: PresnoMap,
  titan: Titan,
  scope: Object,
  getSyno: Function,
  focus: (Focus | false)
): TitanPres => {
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
