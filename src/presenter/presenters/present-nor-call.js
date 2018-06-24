// @flow
import presentArguments from './syntypes/present-arguments.js'

import type { FunctionCall } from '../../types/syntactic-nodes/function-call.js'
import type { FunctionCallPresAttrs } from '../../types/presentations/presno-attrs/function-call-attrs.js'
import type { PresnoMap } from '../../types/presentations/presno-map.js'

export default (
  presnoMap: PresnoMap,
  funkshunCall: FunctionCall,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionCallPresAttrs => {
  let focused = (funkshunCall.id === focusNodeId)

  return {
    syntype: 'functionCall',
    name: 'NOR',
    argumentz: presentArguments(presnoMap, funkshunCall.id, funkshunCall.argumentz, scope, getSyno, focusNodeId),
    bodyRef: false,
    resolved: true,
    focused
  }
}
