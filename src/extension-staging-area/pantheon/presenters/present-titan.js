// @flow
import type { StateSelector } from '../../../types/state-selector.js';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { Titan } from '../types/synos/titan.js';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  titan: Titan,
  scope: Object,
  focus: (Focus | false),
  presentSyno: PresentSyno,
): TitanPresAttrs => ({
  syntype: 'titan',
  name: titan.name,
  child: {
    presnoRef: true,
    id: presentSyno(
      state,
      grammar,
      presnoMap,
      titan.id,
      state.getSyno(titan.child.id),
      scope,
      focus,
      presentSyno,
    ),
  },
  focused: focus && (titan.id === focus.synoId) && (focus.presnoIndex === false),
  presnoFocused: focus && (titan.id === focus.synoId) && focus.presnoIndex,
  charFocused: focus && (titan.id === focus.synoId) && focus.charIndex,
  valid: true,
});
