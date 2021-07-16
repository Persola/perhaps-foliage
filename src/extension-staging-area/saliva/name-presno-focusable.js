// @flow
import NorPrimitiveId from './nor-primitive-id';

import type { StateSelector } from '../../types/state-selector';
import type { Syno } from '../../types/syno';
import type { NamePresnoFocusable } from '../../types/name-presno-focusable';

export default ({
  functionCall: (syno: Syno, state: StateSelector): boolean => {
    if (syno.syntype !== 'functionCall') { throw new TypeError('ah!'); }
    if (syno.callee === false) { return false; }
    const callee = state.getSyno(syno.callee.id);
    return (
      syno.callee !== false
      && callee.id !== NorPrimitiveId
      && callee.syntype !== 'functionDefinition' // not used yet
    );
  },
  argument: (syno: Syno, state: StateSelector): boolean => {
    if (syno.parent === false) { throw new TypeError('argument is root?'); }
    const functionCall = state.getSyno(syno.parent.id);
    if (functionCall.syntype !== 'functionCall') {
      throw new Error('argument parent is not function call? (flow)');
    }
    if (!functionCall.callee) { return true; }
    const callee = state.getSyno(functionCall.callee.id);
    return callee.id !== NorPrimitiveId;
  },
  functionDefinition: (syno: Syno): boolean => syno.id !== NorPrimitiveId,
  functionParameter: (syno: Syno, state: StateSelector): boolean => {
    if (syno.parent === false) { throw new TypeError('parameter is root? (flow)'); }
    const functionDefinition = state.getSyno(syno.parent.id);
    return functionDefinition.id !== NorPrimitiveId;
  },
  variableRef: () => false,
}: NamePresnoFocusable);
