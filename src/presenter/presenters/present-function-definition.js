// @flow
import presentParamters from './present-parameters.js'

import type { FunctionDefinition } from '../../types/syntactic-nodes/function-definition.js' // eslint-disable-line no-unused-vars
import type { FunctionDefPres } from '../../types/presentations/function-definition.js' // eslint-disable-line no-unused-vars

export default (
  funkshunDef: FunctionDefinition,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionDefPres => {
  return {
    syntype: 'functionDefinition',
    synoId: funkshunDef.id,
    name: funkshunDef.name,
    parameterz: presentParamters(funkshunDef.parameterz, scope, getSyno, focusNodeId),
    focused: (funkshunDef.id === focusNodeId)
  }
}
