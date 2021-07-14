// @flow
import presentArguments from './present-arguments.js';
import NorPrimitiveId from '../nor-primitive-id.js';
import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

import type { StateSelector } from '../../../types/state-selector.js';
import type { PresnoRef } from '../../../types/presenter/presno-ref.js';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { PresentSyno } from '../../../types/presenter/present-syno.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { Syno } from '../../../types/syno';
import type { FunctionCall } from '../types/synos/function-call.js';
import type { FunctionDefinition } from '../types/synos/function-definition.js';
import type { FunctionCallPresAttrs } from '../types/presentations/presno-attrs/function-call-attrs.js';

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  funkshunCall: FunctionCall,
  scope: {},
  focus: (Focus | false),
  presentSyno: PresentSyno,
): FunctionCallPresAttrs => {
  let valid = true;
  let name: (string | false) = false;
  let callee: (PresnoRef | false) = false;
  let resolved: boolean = false;

  if (!funkshunCall.callee) {
    valid = false;
  } else {
    const calleeSyno: Syno = state.getSyno(funkshunCall.callee.id);

    if (calleeSyno.syntype === 'functionDefinition') {
      const calleeFuncDef: FunctionDefinition = calleeSyno;
      resolved = true;
      if (funkshunCall.callee.id === NorPrimitiveId) {
        name = calleeFuncDef.name;
      }

      if (argumentParameterMismatch(
        calleeFuncDef,
        funkshunCall.argumentz.map(argRef => state.getArgument(argRef.id)),
        state,
      )) {
        valid = false;
      }

      if (funkshunCall.callee.relation === 'child') {
        callee = {
          presnoRef: true,
          id: presentSyno(
            state,
            grammar,
            presnoMap,
            funkshunCall.id,
            calleeFuncDef,
            scope,
            focus,
            presentSyno,
          ),
        };
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
      state,
      grammar,
      presnoMap,
      funkshunCall.id,
      funkshunCall.argumentz,
      scope,
      focus,
      presentSyno,
    ),
    callee,
    resolved,
    focused,
    presnoFocused,
    charFocused,
    valid,
  };
};
