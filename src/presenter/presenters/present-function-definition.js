// @flow
import presentParamters from './present-parameters.js'

import type { syno } from '../../types/syno.js' // eslint-disable-line no-unused-vars
import type { synoRef } from '../../types/syno-ref.js' // eslint-disable-line no-unused-vars
import type { functionDefinition } from '../../types/syntactic-nodes/function-definition.js' // eslint-disable-line no-unused-vars
import type { valuePresentation } from '../../types/presentations/value-presentation.js' // eslint-disable-line no-unused-vars
import type { functionDefPres } from '../../types/presentations/function-definition.js' // eslint-disable-line no-unused-vars

export default (
  funkshunDef: functionDefinition,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): functionDefPres => {
  return {
    syntype: 'functionDefinition',
    synoId: funkshunDef.id,
    name: funkshunDef.name,
    parameterz: presentParamters(funkshunDef.parameterz, scope, getSyno, focusNodeId),
    focused: (funkshunDef.id === focusNodeId)
  }
}
