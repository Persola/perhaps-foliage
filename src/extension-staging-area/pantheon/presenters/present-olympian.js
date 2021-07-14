// @flow
import type { StateSelector } from '../../../types/state-selector.js';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { Olympian } from '../types/synos/olympian';
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs';

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  olympian: Olympian,
  scope: Object,
  focus: (Focus | false),
  presentSyno: PresentSyno,
): OlympianPresAttrs => {
  const valid = true;
  let child;
  if (olympian.child) {
    child = {
      presnoRef: true,
      id: presentSyno(
        state,
        grammar,
        presnoMap,
        olympian.id,
        state.getSyno(olympian.child.id),
        scope,
        focus,
        presentSyno,
      ),
    };
  }

  return {
    syntype: 'olympian',
    name: olympian.name,
    child: child || false,
    focused: focus && (olympian.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (olympian.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (olympian.id === focus.synoId) && focus.charIndex,
    valid,
  };
};
