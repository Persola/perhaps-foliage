// @flow
import type { FunctionParameter } from '../../../types/syntactic-nodes/function-parameter.js'
import type { FunctionParameterPresAttrs } from '../../../types/presentations/presno-attrs/function-parameter-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { Focus } from '../../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  parameter: FunctionParameter,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): FunctionParameterPresAttrs => {
  return {
    syntype: 'functionParameter',
    slot: parameter.name,
    valueSyntype: parameter.valueSyntype,
    focused: focus && (parameter.id === focus.synoId)
  }
}
