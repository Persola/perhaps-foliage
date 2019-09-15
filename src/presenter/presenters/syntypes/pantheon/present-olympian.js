// @flow
import presentSyno from '../../present-syno.js'

import type { Olympian } from '../../../../types/syntactic-nodes/ ???'
import type { TitanPresAttrs } from '../../../../types/presentations/presno-attrs/ ???'
import type { PresnoMap } from '../../../../types/presentations/presno-map.js'
import type { PresnoRef } from '../../../../types/presentations/presno-ref.js'
import type { SynoId } from '../../../../types/syno-id.js'
import type { Focus } from '../../../../types/editor-state/focus.js'
import type { Grammar } from '../../types/editor-state/grammar.js'

export default (
  grammar: Grammar,
  presnoMap: PresnoMap,
  olympian: Olympian,
  scope: Object,
  getSyno: Function,
  focus: (Focus | false)
): OlympianPresAttrs => {
  let valid = true;
  let child;
  if (olympian.child) {
    child = {
      presnoRef: true,
      id: presentSyno(
        grammar,
        presnoMap,
        olympian.id,
        getSyno(olympian.child),
        scope,
        getSyno,
        focus
      )
    };
  }

  return {
    syntype: 'olympian',
    name: olympian.name,
    child,
    synoId: olympian.id,
    focused: focus && (olympian.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (olympian.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (olympian.id === focus.synoId) && focus.charIndex,
    valid
  }
}
