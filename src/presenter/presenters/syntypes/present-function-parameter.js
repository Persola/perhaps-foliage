// @flow
import type { FunctionParameter } from '../../../types/syntactic-nodes/function-parameter.js'
import type { FunctionParameterPres } from '../../../types/presentations/function-parameter.js'

export default (
  parameter: FunctionParameter,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionParameterPres => {
  return {
    syntype: 'functionParameter',
    synoId: parameter.id,
    slot: parameter.name,
    valueSyntype: parameter.valueSyntype,
    focused: (parameter.id === focusNodeId)
  }
}
