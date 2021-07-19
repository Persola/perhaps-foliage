// @flow
import presentArguments from './present-arguments';
import NorPrimitiveId from '../nor-primitive-id';
import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

import type { StateSelector } from '../../../types/state-selector';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { Focus } from '../../../types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../../types/language-integration/present-language-integration';
import type { Syno } from '../../../types/syno';
import type { FunctionCall } from '../types/synos/function-call';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionCallPresAttrs } from '../types/presentations/presno-attrs/function-call-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
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
        funkshunCall.argumentz.map(argRef => {
          const arg = state.getSyno(argRef.id);
          if (arg.syntype !== 'argument') {
            throw new Error('wrong type from synomap (flow)');
          }
          return arg;
        }),
        state,
      )) {
        valid = false;
      }

      if (funkshunCall.callee.relation === 'child') {
        callee = {
          presnoRef: true,
          id: presentSyno(
            state,
            integration,
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
      integration,
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
