import { ChildAttrPresenter } from '../../../../types/language-integration/presenters/attr-presenters';
import type { NamePartInstruction } from '../../../../types/language-integration/presenters/instructions/presno-child-attr-full-instruction';
import type { UnindexedNonSynPresnoArgs } from '../../../../types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { StateSelector } from '../../../../types/state-selector';
import type { Syno } from '../../../../types/syntactic/syno';

export default (instruction: NamePartInstruction): ChildAttrPresenter => {
  return (
    syno: Syno,
    state: StateSelector,
  ): UnindexedNonSynPresnoArgs => {
    return {
      type: 'nonSynPresno',
      parentId: syno.id,
      nonSynoArgs: {
        valid: true,
        prestype: 'namePart',
        // TODO: validate that from field is a string
        text: (syno[instruction.attr] as string),
      },
    };
  };
};
