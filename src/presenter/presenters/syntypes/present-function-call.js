// @flow
import NorPrimitiveId from '../../../nor-primitive-id.js'
import presentSyno from '../present-syno.js'
import presentArguments from './present-arguments.js'
import presentNorCall from '../present-nor-call.js'

import type { SynoRef } from '../../../types/syno-ref.js'
import type { FunctionCall } from '../../../types/syntactic-nodes/function-call.js'
import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition.js'
import type { FunctionCallPresAttrs } from '../../../types/presentations/presno-attrs/function-call-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'

export default (
  presnoMap: PresnoMap,
  funkshunCall: FunctionCall,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionCallPresAttrs => {
  if (funkshunCall.callee.id === NorPrimitiveId) {
    return(presentNorCall(presnoMap, funkshunCall, scope, getSyno, focusNodeId));
  }

  const callee: FunctionDefinition = getSyno(funkshunCall.callee);
  let resolved: boolean;
  let name: (string | false);
  let bodyRef: (SynoRef | false);
  if (callee.syntype === 'functionDefinition') {
    resolved = true;
    name = false;
    presentSyno(
      presnoMap,
      funkshunCall.id,
      callee,
      scope,
      getSyno,
      focusNodeId
    )
    bodyRef = funkshunCall.callee;
  } else if (callee.syntype === 'variableRef') {
    resolved = Object.keys(scope).includes(callee.name);
    name = callee.name;
    bodyRef = false;
  } else { throw new Error('new type?'); }

  return {
    syntype: 'functionCall',
    name,
    argumentz: presentArguments(presnoMap, funkshunCall.id, funkshunCall.argumentz, scope, getSyno, focusNodeId),
    bodyRef,
    resolved,
    focused: (funkshunCall.id === focusNodeId)
  }
}
