// @flow
import type { PresnoMap } from '../../../types/presenter/presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { PresnoRef } from '../../../types/presenter/presno-ref.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { Argument } from '../types/synos/argument.js';
import type { ArgumentPresAttrs } from '../types/presentations/presno-attrs/argument-attrs.js';

export default (
  grammar: GrammarName,
  presnoMap: PresnoMap,
  argument: Argument,
  scope: {},
  getSyno: Function,
  focus: (Focus | false),
  presentSyno: PresentSyno,
): ArgumentPresAttrs => {
  let valid = true;

  let name = false;
  if (argument.parameter) {
    name = getSyno(argument.parameter).name;
  } else {
    valid = false;
  }

  let value: (PresnoRef | false) = false;
  if (argument.value) {
    value = {
      presnoRef: true,
      id: presentSyno(
        grammar,
        presnoMap,
        argument.id,
        getSyno(argument.value),
        scope,
        getSyno,
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
