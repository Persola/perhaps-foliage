// @flow
import type { PresnoMap } from '../../../types/presenter/presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { Titan } from '../types/synos/titan.js';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  grammar: GrammarName,
  presnoMap: PresnoMap,
  titan: Titan,
  scope: Object,
  getSyno: Function,
  focus: (Focus | false),
  presentSyno: PresentSyno,
): TitanPresAttrs => ({
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
      focus,
      presentSyno,
    ),
  },
  focused: focus && (titan.id === focus.synoId) && (focus.presnoIndex === false),
  presnoFocused: focus && (titan.id === focus.synoId) && focus.presnoIndex,
  charFocused: focus && (titan.id === focus.synoId) && focus.charIndex,
  valid: true,
});
