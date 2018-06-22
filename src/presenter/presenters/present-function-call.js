// @flow
import presentNorCall from './present-nor-call.js'
import presentArguments from './present-arguments.js'
import NorPrimitiveId from '../../nor-primitive-id.js'

import type { FunctionCall } from '../../types/syntactic-nodes/function-call.js' // eslint-disable-line no-unused-vars
import type { FunctionDefinition } from '../../types/syntactic-nodes/function-definition.js' // eslint-disable-line no-unused-vars
import type { FunctionCallPres } from '../../types/presentations/function-call.js' // eslint-disable-line no-unused-vars

export default (
  funkshunCall: FunctionCall,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionCallPres => {
  if (funkshunCall.callee.id === NorPrimitiveId) {
    return(presentNorCall(funkshunCall, scope, getSyno, focusNodeId));
  }

  const callee: FunctionDefinition = getSyno(funkshunCall.callee);
  let resolved: boolean;
  if (callee.syntype === 'functionDefinition') {
    resolved = true;
  } else if (callee.syntype === 'variableRef') {
    resolved = Object.keys(scope).includes(callee.name);
  } else { throw new Error('new type?'); }

  return {
    syntype: 'functionCall',
    synoId: funkshunCall.id,
    name: callee.name,
    argumentz: presentArguments(funkshunCall.argumentz, scope, getSyno, focusNodeId),
    resolved,
    focused: (funkshunCall.id === focusNodeId)
  }
}
