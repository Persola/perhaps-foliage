import StateSelector from '../../../state-interface/state-selector';
import Syno from '../../../state-interface/syntactic-interface/readable/syno';

import type { NamePartInstruction } from '../../../../types/language-integration/presenters/instructions/presno-child-attr-full-instruction';
import type { ChildAttrPresenter } from '../../../../types/language-integration/presenters/attr-presenters';
import type { UnindexedNonSynPresnoArgs } from '../../../../types/presenter/presno-args/unindexed-non-syn-presno-args';

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
        text: (syno.attrs[instruction.attr] as string),
      },
    };
  };
};
