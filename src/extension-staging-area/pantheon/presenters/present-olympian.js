// @flow
import presentSyno from '../../../presenter/presenters/present-syno.js'

import type { SynoId } from '../../../types/syno-id.js'
import type { PresnoMap } from '../../../types/presenter/presno-map.js'
import type { PresnoRef } from '../../../types/presenter/presno-ref.js'
import type { Focus } from '../../../types/editor-state/focus.js'
import type { GrammarName } from '../../../types/editor-state/grammar-name.js'
import type { Olympian } from '../types/synos/olympian'
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs'

export default (
  grammar: GrammarName,
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
    child: child || false,
    synoId: olympian.id,
    focused: focus && (olympian.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (olympian.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (olympian.id === focus.synoId) && focus.charIndex,
    valid
  }
}
