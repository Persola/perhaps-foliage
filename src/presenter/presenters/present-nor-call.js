// @flow
import presentSyno from './present-syno.js'

import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { functionCall } from '../../types/syntactic-nodes/function-call.js' // eslint-disable-line no-unused-vars

import type { presentationGraph } from '../../types/presentations/presentation-graph.js' // eslint-disable-line no-unused-vars

export default (
  funkshunCall: functionCall,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
) => {
  let focused = (funkshunCall.id === focusNodeId)

  return {
    klass: 'functionCall',
    name: 'NOR',
    argumentz: Object.values(funkshunCall.argumentz).map((arg: syno): presentationGraph => {
      return presentSyno(getSyno(arg), scope, getSyno, focusNodeId);
    }),
    resolved: true,
    focused
  }
}
