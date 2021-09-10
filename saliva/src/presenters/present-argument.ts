import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { PresentSyno } from 'saliva-repl/dist/types/presenter/present-syno';
import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/coreside-present-language-integration';

import type { Argument } from '../types/synos/argument';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs';

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  argument: Argument,
  scope: Record<string, unknown>,
  focus: Focus | null,
  presentSyno: PresentSyno,
): ArgumentPresAttrs => {
  let name = null;

  if (argument.parameter) {
    const param = state.getSyno(argument.parameter.id);

    if (param.syntype !== 'functionParameter') {
      throw new Error('wrong type from synomap (flow)');
    }

    name = param.name;
  }

  let value: PresnoRef | null = null;

  if (argument.value) {
    value = {
      presnoRef: true,
      id: presentSyno(
        state,
        integration,
        presnoMap,
        argument.id,
        state.getSyno(argument.value.id),
        scope,
        focus,
        presentSyno,
      ),
    };
  }

  return {
    syntype: 'argument',
    name,
    value,
  };
};
