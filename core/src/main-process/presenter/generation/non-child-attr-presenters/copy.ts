import type { NonChildAttrPresenter } from '../../../../types/language-integration/presenters/attr-presenters';
import type { CopyInstruction } from '../../../../types/language-integration/presenters/instructions/presno-non-child-attr-full-instruction';
import type { PresnoNonChildAttrVal } from '../../../../types/presenter/presnos/presno-attrs';
import type { Syno } from '../../../../types/syntactic/syno';

export default (instruction: CopyInstruction): NonChildAttrPresenter => {
  return (
    syno: Syno,
    // state: StateSelector,
  ): PresnoNonChildAttrVal => {
    // TODO: validate type of attr from grammar
    return (syno[instruction.attr] as PresnoNonChildAttrVal);
  };
};
