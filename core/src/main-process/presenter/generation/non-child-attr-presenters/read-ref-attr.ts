import Syno from '../../../syntactic-interface/newnew/readable/syno';

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
    switch (syno.hasRef(instruction.ref)) {
      case 'intratree': {
        const referentId = syno.intratreeRefs[instruction.ref];
        if (referentId === null) {
          return null;
        }
        referentSyno = state.getEditeeSyno(referentId);
        break;
      } case 'intertree': {
        const referentUri = syno.intertreeRefs[instruction.ref];
        if (referentUri === null) {
          return null;
        }
        referentSyno = state.getSynoByUri(referentUri);
        break;
      } case false: {
        return null;
      } default: {
        throw new Error();
      }
    }

    // TODO: ref type has attr and attr has correct type
    const refAttrVal = referentSyno.attrs[instruction.attr];

    return refAttrVal;
  };
};
