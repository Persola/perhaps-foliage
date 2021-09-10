import type { Syno } from 'saliva-repl/dist/types/syntactic/syno';
import type { StateSelector } from 'saliva-repl/dist/types/state-selector';

import { Argument } from '../types/synos/argument';
import { FunctionCall } from '../types/synos/function-call';
import { FunctionDefinition } from '../types/synos/function-definition';

import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

export default (
  funkshunCall: FunctionCall,
  state: StateSelector,
): boolean => {
  if (!funkshunCall.callee) {
    return false;
  }

  const calleeSyno: Syno = state.getSyno(funkshunCall.callee.id);
  if (calleeSyno.syntype !== 'functionDefinition') {
    throw new TypeError('bad callee');
  }
  const calleeFuncDef = calleeSyno as FunctionDefinition;

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
    return false;
  }

  return true;
};
