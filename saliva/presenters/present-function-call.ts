import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { PresentSyno } from 'saliva-repl/dist/types/presenter/present-syno';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';
import type { Syno } from 'saliva-repl/dist/types/syntactic/syno';

// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from '../primitives.yml';
import focuses from './helpers/focuses';
import presentArguments from './present-function-call/present-arguments';
import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

import type { FunctionCall } from '../types/synos/function-call';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { Argument } from '../types/synos/argument';
import type { FunctionCallPresAttrs } from '../types/presentations/presno-attrs/function-call-attrs';

const primitiveIds = Object.keys(primitives);
export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  funkshunCall: FunctionCall,
  scope: Record<string, unknown>,
  focus: Focus | null | undefined,
  presentSyno: PresentSyno,
): FunctionCallPresAttrs => {
  let valid = true;
  let name: string | null | undefined = null;
  let callee: PresnoRef | null | undefined = null;
  let resolved = false;

  if (!funkshunCall.callee) {
    valid = false;
  } else {
    const calleeSyno: Syno = state.getSyno(funkshunCall.callee.id);

    if (calleeSyno.syntype === 'functionDefinition') {
      const calleeFuncDef = calleeSyno as FunctionDefinition;
      resolved = true;

      if (primitiveIds.includes(funkshunCall.callee.id)) {
        name = calleeFuncDef.name;
      }

      if (
        argumentParameterMismatch(
          calleeFuncDef,
          funkshunCall.argumentz.map(argRef => {
            const arg = state.getSyno(argRef.id);

            if (arg.syntype !== 'argument') {
              throw new Error('wrong type from synomap (flow)');
            }

            return (arg as Argument);
          }),
          state,
        )
      ) {
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
    } else if (calleeSyno.syntype === 'variableRef') {
      // Never Been Run (1999)
      throw new Error(
        "Function never did have they ever had a been having them a variableRef 'afore.",
      ); // resolved = Object.keys(scope).includes(callee.referent.id);
      // if (resolved) {
      //  name = getSyno(callee.referent.id).name
      // } else {
      //  name = '(!)'
      // }
    } else {
      throw new Error('new type?');
    }
  }

  const { focused, presnoFocused, charFocused } = focuses(
    focus,
    funkshunCall.id,
  );
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
