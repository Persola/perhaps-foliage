// @flow
import presentNorCall from './present-nor-call.js'
import presentArguments from './present-arguments.js'
import norPrimitiveId from '../../nor-primitive-id.js'

import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { synoRef } from '../../types/syno-ref.js' // eslint-disable-line no-unused-vars
import type { functionCall } from '../../types/syntactic-nodes/function-call.js' // eslint-disable-line no-unused-vars
import type { functionDefinition } from '../../types/syntactic-nodes/function-definition.js' // eslint-disable-line no-unused-vars
import type { valuePresentation } from '../../types/presentations/value-presentation.js' // eslint-disable-line no-unused-vars
import type { functionCallPres } from '../../types/presentations/function-call.js' // eslint-disable-line no-unused-vars

export default (
  funkshunCall: functionCall,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): functionCallPres => {
  let resolved: boolean;
  let focused: boolean = (funkshunCall.id === focusNodeId)
  if (funkshunCall.callee.id === norPrimitiveId) {
    return(presentNorCall(funkshunCall, scope, getSyno, focusNodeId));
  }

  const callee: functionDefinition = getSyno(funkshunCall.callee);
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
    focused
  }
}
