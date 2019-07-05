// @flow
import presentParameters from './present-parameters.js'
import presentSyno from '../present-syno.js'

import type { FunctionDefinition } from '../../../types/syntactic-nodes/function-definition.js'
import type { FunctionDefPresAttrs } from '../../../types/presentations/presno-attrs/function-definition-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { PresnoRef } from '../../../types/presentations/presno-ref.js'
import type { SynoId } from '../../../types/syno-id'
import type { Focus } from '../../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  funkshunDef: FunctionDefinition,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): FunctionDefPresAttrs => {
  let valid = true;
  let body: (PresnoRef | false)  = false;
  if (!funkshunDef.body) {
    valid = false;
  } else {
    body = {
      presnoRef: true,
      id: presentSyno(
        presnoMap,
        funkshunDef.id,
        getSyno(funkshunDef.body),
        scope,
        getSyno,
        focus
      )
    };
  }

  return {
    syntype: 'functionDefinition',
    name: funkshunDef.name,
    parameters: presentParameters(presnoMap, funkshunDef.id, funkshunDef.parameters, scope, getSyno, focus),
    focused: focus && (funkshunDef.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (funkshunDef.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (funkshunDef.id === focus.synoId) && focus.charIndex,
    body,
    valid
  }
}
