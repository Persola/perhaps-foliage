import focuses from './helpers/focuses';
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { Focus } from '../../../types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../../types/language-integration/present-language-integration';
import type { Argument } from '../types/synos/argument';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  argument: Argument,
  scope: {},
  focus: Focus | null | undefined,
  presentSyno: PresentSyno,
): ArgumentPresAttrs => {
  let valid = true;
  let name = null;

  if (argument.parameter) {
    const param = state.getSyno(argument.parameter.id);

    if (param.syntype !== 'functionParameter') {
      throw new Error('wrong type from synomap (flow)');
    }

    name = param.name;
  } else {
    valid = false;
  }

  let value: PresnoRef | null | undefined = null;

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
  } else {
    valid = false;
  }

  const { focused, presnoFocused, charFocused } = focuses(focus, argument.id);
  return {
    syntype: 'argument',
    name,
    value,
    focused,
    presnoFocused,
    charFocused,
    valid,
  };
};
