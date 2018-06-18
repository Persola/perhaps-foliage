// @flow
import presentNorCall from './present-nor-call.js'

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
  let resolved: boolean;
  let focused = (funkshunCall.id === focusNodeId)
  if (funkshunCall.nor) {
    return(presentNorCall(funkshunCall, scope, getSyno, focusNodeId));
  }

  const callee = getSyno(funkshunCall.callee);
   if (callee.klass === 'functionDefinition') {
    resolved = true;
  } else if (callee.klass === 'variableRef') {
    resolved = Object.keys(scope).includes(callee.name);
  } else { throw new Error('new type?'); }

  return {
    klass: 'functionCall',
    name: callee.name,
    argumentz: Object.values(funkshunCall.argumentz).map((arg: syno): presentationGraph => {
      return presentNode(getSyno(arg), scope, getSyno, focusNodeId);
    }),
    resolved,
    focused
  }
}
