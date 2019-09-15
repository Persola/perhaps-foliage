// @flow
import presentSyno from '../../present-syno.js'

import presentArguments from './present-arguments.js'
import NorPrimitiveId from '../../../../nor-primitive-id.js'
import argumentParameterMismatch from '../../../../syntree-utils/argument-parameter-mismatch'

import type { PresnoRef } from '../../../../types/presentation/prseno-ref.js'
import type { FunctionCall } from '../../../../types/syntactic-nodes/function-call.js'
import type { FunctionDefinition } from '../../../../types/syntactic-nodes/function-definition.js'
import type { VariableRef } from '../../../../types/syntactic-nodes/variable-ref.js'
import type { FunctionCallPresAttrs } from '../../../../types/presentations/presno-attrs/function-call-attrs.js'
import type { PresnoMap } from '../../../../types/presentations/presno-map.js'
import type { Focus } from '../../../../types/editor-state/focus.js'
import type { Grammar } from '../../types/editor-state/grammar.js'

export default (
  grammar: Grammar,
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
    const calleeSyno: (VariableRef | FunctionDefinition) = getSyno(funkshunCall.callee);
    if (calleeSyno.syntype === 'functionDefinition') {
      resolved = true;
      if (funkshunCall.callee.id === NorPrimitiveId) {
        name = calleeSyno.name;
      }

      if (argumentParameterMismatch(
          calleeSyno,
          funkshunCall.argumentz.map(arg => getSyno(arg)),
          getSyno
      )) {
        valid = false; 
      }

      if (funkshunCall.callee.relation === 'child') {
        callee = {
          presnoRef: true,
          id: presentSyno(
            grammar,
            presnoMap,
            funkshunCall.id,
            calleeSyno,
            scope,
            getSyno,
            focus
          )
        }
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

  let focused;
  let presnoFocused;
  let charFocused;
  if (funkshunCall.callee.id === NorPrimitiveId) {
    focused = focus && (funkshunCall.id === focus.synoId) && (focus.presnoIndex === false);
    presnoFocused = focus && (funkshunCall.id === focus.synoId) && focus.presnoIndex;
    charFocused = focus && (funkshunCall.id === focus.synoId) && focus.charIndex;
  } else {
    focused = focus && (funkshunCall.id === focus.synoId);
    presnoFocused = false;
    charFocused = false;
  }

  return {
    syntype: 'functionCall',
    name,
    argumentz: presentArguments(
      grammar,
      presnoMap,
      funkshunCall.id,
      funkshunCall.argumentz, 
      scope,
      getSyno,
      focus
    ),
    callee,
    resolved,
    focused,
    presnoFocused,
    charFocused,
    valid
  }
}
