// @flow
import presentArguments from './syntypes/present-arguments.js'

import type { FunctionCall } from '../../types/syntactic-nodes/function-call.js'
import type { FunctionCallPresAttrs } from '../../types/presentations/presno-attrs/function-call-attrs.js'
import type { PresnoMap } from '../../types/presentations/presno-map.js'
import type { Focus } from '../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  funkshunCall: FunctionCall,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): FunctionCallPresAttrs => {
  let focused = focus && (funkshunCall.id === focus.synoId)

  return {
    syntype: 'functionCall',
    name: 'NOR',
    argumentz: presentArguments(presnoMap, funkshunCall.id, funkshunCall.argumentz, scope, getSyno, focus),
    bodyRef: false,
    resolved: true,
    focused
  }
}
