import type { PresnoNonChildAttrInstruction } from '../../../../types/language-integration/presenters/presno-non-child-attr-instruction';
import type { PresnoNonChildAttrFullInstruction } from '../../../../types/language-integration/presenters/presno-non-child-attr-full-instruction';
import type { PresnoChildAttrInstruction } from '../../../../types/language-integration/presenters/presno-child-attr-instruction';
import type { PresnoChildAttrFullInstruction } from '../../../../types/language-integration/presenters/presno-child-attr-full-instruction';

export function completeAttrInstruction(
  instruction: PresnoNonChildAttrInstruction,
): PresnoNonChildAttrFullInstruction {
  if (typeof instruction === 'object') {
    return instruction;
  }

  if (typeof instruction === 'string') {
    return {
      from: instruction,
    };
  }

  throw new TypeError('Received syno presentation instruction of unrecognized form');
}

export function completeChildInstruction(
  instruction: PresnoChildAttrInstruction,
): PresnoChildAttrFullInstruction {
  // if (typeof instruction === 'object') {
  //   return instruction;
  // }

  // if (typeof instruction === 'string') {
  //   return {
  //     attr: instruction,
  //     from: instruction,
  //   };
  // }

  throw new TypeError('Received syno presentation instruction of unrecognized form');
}
