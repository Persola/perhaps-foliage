// @flow
import NorPrimitiveId from '../../../nor-primitive-id.js'
import presentSyno from '../present-syno.js'
import presentArguments from './present-arguments.js'
import presentNorCall from '../present-nor-call.js'

import type { SynoRef } from '../../../types/syno-ref.js'
import type { FunctionCall } from '../../../types/syntactic-nodes/function-call.js'
import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition.js'
import type { VariableRef } from '../../../types/syntactic-nodes/variable-ref.js'
import type { FunctionCallPresAttrs } from '../../../types/presentations/presno-attrs/function-call-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { Focus } from '../../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  funkshunCall: FunctionCall,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): FunctionCallPresAttrs => {
  if (funkshunCall.callee.id === NorPrimitiveId) {
    return(presentNorCall(presnoMap, funkshunCall, scope, getSyno, focus));
  }

  const callee: (VariableRef | FunctionDefinition) = getSyno(funkshunCall.callee);
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
      focus
    )
    bodyRef = funkshunCall.callee;
  } else if (callee.syntype === 'variableRef') { // never been run
    resolved = Object.keys(scope).includes(callee.referent.id);
    if (resolved) {
      name = getSyno(callee.referent.id).name
    } else {
      name = '(!)'
    }
    bodyRef = false;
  } else { throw new Error('new type?'); }

  return {
    syntype: 'functionCall',
    name,
    argumentz: presentArguments(presnoMap, funkshunCall.id, funkshunCall.argumentz, scope, getSyno, focus),
    bodyRef,
    resolved,
    focused: focus && (funkshunCall.id === focus.synoId)
  }
}
