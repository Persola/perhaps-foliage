// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { Focus } from '../../../types/editor-state/focus';
import type { LanguageIntegration } from '../../../types/language-integration';
import type { Olympian } from '../types/synos/olympian';
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs';

export default (
  state: StateSelector,
  integration: LanguageIntegration,
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
        integration,
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
