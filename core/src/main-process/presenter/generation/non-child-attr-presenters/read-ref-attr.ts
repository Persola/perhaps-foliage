import type { NonChildAttrPresenter } from '../../../../types/language-integration/presenters/attr-presenters';
import type { ReadRefAttrInstruction } from '../../../../types/language-integration/presenters/instructions/presno-non-child-attr-full-instruction';
import type { PresnoAttrVal } from '../../../../types/presenter/presnos/presno-attrs';
import type { StateSelector } from '../../../../types/state-selector';
import type { Syno } from '../../../../types/syntactic/syno';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';

export default (instruction: ReadRefAttrInstruction): NonChildAttrPresenter => {
  return (
    syno: Syno,
    state: StateSelector,
  ): PresnoAttrVal => {
    // TODO: validate ref key is syno ref
    const ref = syno[instruction.ref] as SynoRef;
    if (ref === null) {
      return null;
    }

    if (
      Object.keys(instruction).includes('ifEdgeType')
      && instruction.ifEdgeType !== ref.relation
    ) {
      return null;
    }

    // TODO: ref type has attr and attr is non child attr
    const refAttrVal = state.getSyno(ref.id)[instruction.attr] as PresnoAttrVal;

    return refAttrVal;
  };
};
