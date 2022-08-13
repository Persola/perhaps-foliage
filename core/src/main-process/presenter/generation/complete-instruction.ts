import type { PresnoNonChildAttrInstruction } from '../../../types/language-integration/presenters/instructions/presno-non-child-attr-instruction';
import type { PresnoNonChildAttrFullInstruction } from '../../../types/language-integration/presenters/instructions/presno-non-child-attr-full-instruction';
import type { PresnoChildAttrInstruction } from '../../../types/language-integration/presenters/instructions/presno-child-attr-instruction';
import type { PresnoChildAttrFullInstruction } from '../../../types/language-integration/presenters/instructions/presno-child-attr-full-instruction';

export function completeAttrInstruction(
  instruction: PresnoNonChildAttrInstruction,
): PresnoNonChildAttrFullInstruction {
  if (typeof instruction === 'object') {
    return instruction;
  }

  if (typeof instruction === 'string') {
    return {
      from: 'attr',
      attr: instruction,
    };
  }

  throw new TypeError('Received syno presentation instruction of unrecognized form');
}

export function completeChildInstruction(
  instruction: PresnoChildAttrInstruction,
): PresnoChildAttrFullInstruction {
  if (typeof instruction === 'object') {
    return instruction;
  }

  if (typeof instruction === 'string') {
    return {
      from: 'attr',
      attr: 'who said you could have a default?!',
      as: 'NamePart',
    };
  }

  throw new TypeError('Received syno presentation instruction of unrecognized form');
}
