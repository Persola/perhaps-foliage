import Syno from '../../../syntactic-interface/newnew/syno';

import type { NonChildAttrPresenter } from '../../../../types/language-integration/presenters/attr-presenters';
import type { ReadRefAttrInstruction } from '../../../../types/language-integration/presenters/instructions/presno-non-child-attr-full-instruction';
import type { PresnoAttrVal } from '../../../../types/presenter/presnos/presno-attrs';
import type { StateSelector } from '../../../../types/state-selector';

export default (instruction: ReadRefAttrInstruction): NonChildAttrPresenter => {
  return (
    syno: Syno,
    state: StateSelector,
  ): PresnoAttrVal => {
    let referentSyno;
    if (syno.hasRef(instruction.ref) === 'intratree') {
      const referentId = syno.intratreeRefs[instruction.ref];
      if (referentId === null) {
        return null;
      }
      referentSyno = state.getEditeeSyno(referentId);
    }

    if (syno.hasRef(instruction.ref) === 'intertree') {
      const referentUri = syno.intertreeRefs[instruction.ref];
      if (referentUri === null) {
        return null;
      }
      referentSyno = state.getSynoByUri(referentUri);
    }

    // TODO: ref type has attr and attr has correct type
    const refAttrVal = referentSyno.attrs[instruction.attr];

    return refAttrVal;
  };
};
