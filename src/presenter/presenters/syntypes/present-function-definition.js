// @flow
import presentParameters from './present-parameters.js'
import presentSyno from '../present-syno.js'

import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition.js'
import type { FunctionDefPresAttrs } from '../../../types/presentations/presno-attrs/function-definition-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { SynoId } from '../../../types/syno-id'

export default (
  presnoMap: PresnoMap,
  funkshunDef: FunctionDefinition,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): FunctionDefPresAttrs => {
  const bodySyno = getSyno(funkshunDef.body);
  const bodyPresnoId: SynoId = presentSyno(presnoMap, funkshunDef.id, bodySyno, scope, getSyno, focusNodeId);

  return {
    syntype: 'functionDefinition',
    name: funkshunDef.name,
    parameters: presentParameters(presnoMap, funkshunDef.id, funkshunDef.parameters, scope, getSyno, focusNodeId),
    focused: (funkshunDef.id === focusNodeId),
    body: {
      presnoRef: true,
      id: bodyPresnoId
    }
  }
}
