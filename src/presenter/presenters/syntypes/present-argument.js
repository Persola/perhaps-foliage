// @flow
import presentSyno from '../present-syno.js'
import type { Argument } from '../../../types/syntactic-nodes/argument.js'
import type { ArgumentPresAttrs } from '../../../types/presentations/presno-attrs/argument-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { SynoId } from '../../../types/syno-id.js'

export default (
  presnoMap: PresnoMap,
  argument: Argument,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): ArgumentPresAttrs => {
  const valuePresnoId: SynoId = presentSyno(
    presnoMap,
    argument.id,
    getSyno(argument.value),
    scope,
    getSyno,
    focusNodeId
  );

  return {
    syntype: 'argument',
    value: {
      presnoRef: true,
      id: valuePresnoId
    },
    focused: (argument.id === focusNodeId)
  }
}
