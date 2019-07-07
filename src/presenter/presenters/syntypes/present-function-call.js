// @flow
import NorPrimitiveId from '../../../nor-primitive-id.js'
import presentSyno from '../present-syno.js'
import presentArguments from './present-arguments.js'
import presentNorCall from '../present-nor-call.js'
import argumentParameterMismatch from '../../../syntree-utils/argument-parameter-mismatch'

import type { PresnoRef } from '../../../types/presentation/prseno-ref.js'
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
  let valid = true;
  let name: (string | false) = false;
  let callee: (PresnoRef | false) = false;
  let resolved: boolean = false;

  if (!funkshunCall.callee) {
    valid = false; 
  } else {
    if (funkshunCall.callee.id === NorPrimitiveId) {
      return(presentNorCall(presnoMap, funkshunCall, scope, getSyno, focus));
    }

    const calleeSyno: (VariableRef | FunctionDefinition) = getSyno(funkshunCall.callee);
    if (calleeSyno.syntype === 'functionDefinition') {
      resolved = true;
      name = false;

      if (argumentParameterMismatch(
          calleeSyno,
          funkshunCall.argumentz.map(arg => getSyno(arg)),
          getSyno
      )) {
        valid = false; 
      }

      callee = {
        presnoRef: true,
        id: presentSyno(
          presnoMap,
          funkshunCall.id,
          calleeSyno,
          scope,
          getSyno,
          focus
        )
      }
    } else if (calleeSyno.syntype === 'variableRef') { // Never Been Run (1999)
      throw new Error("Function never did have they ever had a been having them a variableRef 'afore.");
      // resolved = Object.keys(scope).includes(callee.referent.id);
      // if (resolved) {
      //   name = getSyno(callee.referent.id).name
      // } else {
      //   name = '(!)'
      // }
    } else {
      throw new Error('new type?');
    }
  }

  return {
    syntype: 'functionCall',
    name,
    argumentz: presentArguments(
      presnoMap,
      funkshunCall.id,
      funkshunCall.argumentz, 
      scope,
      getSyno,
      focus
    ),
    callee,
    resolved,
    focused: focus && (funkshunCall.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (funkshunCall.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (funkshunCall.id === focus.synoId) && focus.charIndex,
    valid
  }
}
