import focuses from './helpers/focuses';

import type { StateSelector } from '../../src/types/state-selector';
import type { MutablePresnoMap } from '../../src/types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../src/types/presenter/present-syno';
import type { Focus } from '../../src/types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../src/types/language-integration/present-language-integration';
import type { Olympian } from '../types/synos/olympian';
import type { OlympianPresAttrs } from '../types/presentations/presno-attrs/olympian-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  olympian: Olympian,
  scope: Record<string, unknown>,
  focus: Focus | null,
  presentSyno: PresentSyno,
): OlympianPresAttrs => {
  const valid = true;
  let child = null;

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

  const { focused, presnoFocused, charFocused } = focuses(focus, olympian.id);
  return {
    syntype: 'olympian',
    name: olympian.name,
    child,
    focused,
    presnoFocused,
    charFocused,
    valid,
  };
};
