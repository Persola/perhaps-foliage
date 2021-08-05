import focuses from './helpers/focuses';

import type { StateSelector } from '../../src/types/state-selector';
import type { MutablePresnoMap } from '../../src/types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../src/types/presenter/present-syno';
import type { Focus } from '../../src/types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../src/types/language-integration/present-language-integration';
import type { Titan } from '../types/synos/titan';
import type { TitanPresAttrs } from '../types/presentations/presno-attrs/titan-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  titan: Titan,
  scope: Record<string, unknown>,
  focus: Focus | null,
  presentSyno: PresentSyno,
): TitanPresAttrs => {
  const { focused, presnoFocused, charFocused } = focuses(focus, titan.id);
  return {
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
    focused,
    presnoFocused,
    charFocused,
    valid: true,
  };
};
