import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { PresentAndReturnRef } from 'perhaps-foliage/dist/types/presenter/present-and-return-ref';
import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';
import type { Syno } from 'perhaps-foliage/dist/types/syntactic/syno';

import type { FunctionCall } from '../types/synos/function-call';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionCallPresAttrs } from '../types/presentations/presno-attrs/function-call-attrs';

export default (
  funkshunCall: FunctionCall,
  state: StateSelector,
  presentAndReturnRef: PresentAndReturnRef,
): FunctionCallPresAttrs => {
  let name: (null | PresnoRef) = null;
  let callee: (null | PresnoRef) = null;
  let resolved = false;

  if (funkshunCall.callee) {
    const calleeSyno: Syno = state.getSyno(funkshunCall.callee.id);

    if (calleeSyno.syntype !== 'functionDefinition') {
      throw new Error('new type?');
    }

    const calleeFuncDef = calleeSyno as FunctionDefinition;
    resolved = true;

    if (funkshunCall.callee.relation === 'child') {
      callee = presentAndReturnRef(funkshunCall.callee);
    } else {
      name = presentAndReturnRef(
        {
          valid: true,
          presnoIndex: 0,
          prestype: 'NamePart',
          text: calleeFuncDef.name,
        },
        funkshunCall,
      );
    }
  }

  return {
    syntype: 'functionCall',
    name,
    argumentz: funkshunCall.argumentz.map(argRef => presentAndReturnRef(argRef)),
    callee,
    resolved,
  };
};
