// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { Focus } from '../../../types/editor-state/focus';
import type { LanguageIntegration } from '../../../types/language-integration';
import type { Argument } from '../types/synos/argument';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs';

export default (
  state: StateSelector,
  integration: LanguageIntegration,
  presnoMap: MutablePresnoMap,
  argument: Argument,
  scope: {},
  focus: (Focus | false),
  presentSyno: PresentSyno,
): ArgumentPresAttrs => {
  let valid = true;

  let name = false;
  if (argument.parameter) {
    const param = state.getSyno(argument.parameter.id);
    if (param.syntype !== 'functionParameter') {
      throw new Error('wrong type from synomap (flow)');
    }
    name = param.name;
  } else {
    valid = false;
  }

  let value: (PresnoRef | false) = false;
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

  return {
    syntype: 'argument',
    name,
    value,
    focused: focus && (argument.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (argument.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (argument.id === focus.synoId) && focus.charIndex,
    valid,
  };
};
