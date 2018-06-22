// @flow
import presentParameters from './present-parameters.js'
import presentFunctionCall from './present-function-call.js'

import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition.js'
import type { FunctionDefPres } from '../../../types/presentations/function-definition.js'

export default (
  funkshunDef: FunctionDefinition,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionDefPres => {
  const bodySyno = getSyno(funkshunDef.body);

  return {
    syntype: 'functionDefinition',
    synoId: funkshunDef.id,
    name: funkshunDef.name,
    parameterz: presentParameters(funkshunDef.parameterz, scope, getSyno, focusNodeId),
    focused: (funkshunDef.id === focusNodeId),
    body: presentFunctionCall(bodySyno, scope, getSyno, focusNodeId)
  }
}
