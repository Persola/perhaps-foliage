// @flow
import presentArguments from './present-arguments.js'

import type { FunctionCall } from '../../types/syntactic-nodes/function-call.js'
import type { FunctionCallPres } from '../../types/presentations/function-call.js'

export default (
  funkshunCall: FunctionCall,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionCallPres => {
  let focused = (funkshunCall.id === focusNodeId)

  return {
    syntype: 'functionCall',
    synoId: funkshunCall.id,
    name: 'NOR',
    argumentz: presentArguments(funkshunCall.argumentz, scope, getSyno, focusNodeId),
    resolved: true,
    focused
  }
}
