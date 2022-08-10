import type { childPresnoInstruction } from '../../../types/language-integration/renderers/child-presno-instruction';
import type { childPresnoFullInstruction } from '../../../types/language-integration/renderers/child-presno-full-instruction';

export default (
  instruction: childPresnoInstruction,
): childPresnoFullInstruction => {
  if (typeof instruction === 'object') {
    return {
      attr: 'id',
      as: 'presno',
      ...instruction,
    };
  }

  if (typeof instruction === 'string') {
    return {
      attr: instruction,
      as: 'presno',
    };
  }

  throw new TypeError('Received child presno renderering instruction of unrecognized form');
};
