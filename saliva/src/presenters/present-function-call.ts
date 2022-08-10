import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { Syno } from 'perhaps-foliage/dist/types/syntactic/syno';
import { SynPresnoArgs } from 'perhaps-foliage/dist/types/presenter/presno-args/syn-presno-args';

import type { FunctionCall } from '../types/synos/function-call';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionCallPresAttrs } from '../types/presentations/presno-attrs/function-call-attrs';

export default (
  funkshunCall: FunctionCall,
  state: StateSelector,
  childSynPresnoArgs: { argumentz: SynPresnoArgs[] },
): FunctionCallPresAttrs => {
  let name: (null | string) = null;

  if (funkshunCall.callee) {
    const calleeSyno: Syno = state.getSyno(funkshunCall.callee.id);

    const calleeFuncDef = calleeSyno as FunctionDefinition;

    if (funkshunCall.callee.relation !== 'child') {
      name = calleeFuncDef.name;
    }
  }

  return {
    attrs: {
      syntype: 'functionCall',
      name,
    },
    childPresnoArgs: {
      ...childSynPresnoArgs,
    },
  };
};
