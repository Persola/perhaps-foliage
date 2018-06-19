// @flow
import presentArguments from './present-arguments.js'

import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { functionCall } from '../../types/syntactic-nodes/function-call.js' // eslint-disable-line no-unused-vars
import type { presentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars
import type { functionCallPres } from '../../types/presentations/function-call.js' // eslint-disable-line no-unused-vars

export default (
  funkshunCall: functionCall,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): functionCallPres => {
  let focused = (funkshunCall.id === focusNodeId)

  return {
    syntype: 'functionCall',
    name: 'NOR',
    argumentz: presentArguments(funkshunCall.argumentz, scope, getSyno, focusNodeId),
    resolved: true,
    focused
  }
}
