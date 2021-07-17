// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { Focus } from '../../../types/editor-state/focus';
import type { LanguageIntegration } from '../../../types/language-integration';
import type { Titan } from '../types/synos/titan';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  state: StateSelector,
  integration: LanguageIntegration,
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
      integration,
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
