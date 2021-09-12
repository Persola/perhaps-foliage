import makePresnoRef from 'saliva-repl/dist/core-context/presenter/presenters/make-presno-ref';

import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { PresnoRef } from 'saliva-repl/dist/types/presenter/presno-ref';
import type { Syno } from 'saliva-repl/dist/types/syntactic/syno';

// @ts-ignore how do I configure TS to ignore webpacked imports?
import primitives from '../primitives.yml';

import type { FunctionCall } from '../types/synos/function-call';
import type { FunctionDefinition } from '../types/synos/function-definition';
import type { FunctionCallPresAttrs } from '../types/presentations/presno-attrs/function-call-attrs';

const primitiveIds = Object.keys(primitives);

export default (
  funkshunCall: FunctionCall,
  state: StateSelector,
): FunctionCallPresAttrs => {
  let name: string | null | undefined = null;
  let callee: PresnoRef | null | undefined = null;
  let resolved = false;

  if (funkshunCall.callee) {
    const calleeSyno: Syno = state.getSyno(funkshunCall.callee.id);

    if (calleeSyno.syntype === 'functionDefinition') {
      const calleeFuncDef = calleeSyno as FunctionDefinition;
      resolved = true;

      if (primitiveIds.includes(calleeFuncDef.id)) {
        name = calleeFuncDef.name;
      }

      if (funkshunCall.callee.relation === 'child') {
        callee = makePresnoRef(funkshunCall.callee);
      }
    } else {
      throw new Error('new type?');
    }
  }

  return {
    syntype: 'functionCall',
    name,
    argumentz: funkshunCall.argumentz.map(argRef => makePresnoRef(argRef)),
    callee,
    resolved,
  };
};
