// @flow
import type { functionParameter } from '../../types/syntactic-nodes/function-parameter.js'
import type { functionParameterPres } from '../../types/presentations/function-parameter.js'

export default (
  parameter: functionParameter,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): functionParameterPres => {
  return {
    syntype: 'functionParameter',
    synoId: parameter.id,
    slot: parameter.name,
    valueKlass: parameter.valueKlass,
    focused: (parameter.id === focusNodeId)
  }
}
