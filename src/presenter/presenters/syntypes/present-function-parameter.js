// @flow
import type { FunctionParameter } from '../../../types/syntactic-nodes/function-parameter.js'
import type { FunctionParameterPresAttrs } from '../../../types/presentations/presno-attrs/function-parameter-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'

export default (
  presnoMap: PresnoMap,
  parameter: FunctionParameter,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionParameterPresAttrs => {
  return {
    syntype: 'functionParameter',
    slot: parameter.name,
    valueSyntype: parameter.valueSyntype,
    focused: (parameter.id === focusNodeId)
  }
}
