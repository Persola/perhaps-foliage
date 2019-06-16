// @flow
import presentSyno from '../present-syno.js'
import type { Argument } from '../../../types/syntactic-nodes/argument.js'
import type { ArgumentPresAttrs } from '../../../types/presentations/presno-attrs/argument-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { SynoId } from '../../../types/syno-id.js'
import type { Focus } from '../../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  argument: Argument,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): ArgumentPresAttrs => {
  const name = getSyno(argument.parameter).name;
  const valuePresnoId: SynoId = presentSyno(
    presnoMap,
    argument.id,
    getSyno(argument.value),
    scope,
    getSyno,
    focus
  );

  return {
    syntype: 'argument',
    name,
    value: {
      presnoRef: true,
      id: valuePresnoId
    },
    focused: focus && (argument.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (argument.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (argument.id === focus.synoId) && focus.charIndex
  }
}
