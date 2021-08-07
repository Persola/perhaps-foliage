import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { PresentSyno } from 'saliva-repl/dist/types/presenter/present-syno';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';

import focuses from './helpers/focuses';

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
