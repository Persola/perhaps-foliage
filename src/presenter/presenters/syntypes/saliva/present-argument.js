// @flow
import presentSyno from '../../present-syno.js'

import type { Argument } from '../../../../types/syntactic-nodes/argument.js'
import type { ArgumentPresAttrs } from '../../../../types/presentations/presno-attrs/argument-attrs.js'
import type { PresnoMap } from '../../../../types/presentations/presno-map.js'
import type { PresnoRef } from '../../../../types/presentations/presno-ref.js'
import type { SynoId } from '../../../../types/syno-id.js'
import type { Focus } from '../../../../types/editor-state/focus.js'
import type { Grammar } from '../../types/editor-state/grammar.js'

export default (
  grammar: Grammar,
  presnoMap: PresnoMap,
  argument: Argument,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
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
        focus
      )
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
    valid
  }
}
