import type { BooleanLiteral } from '../types/synos/boolean-literal';
import type { BooleanLiteralPresAttrs } from '../types/presentations/presno-attrs/boolean-literal-attrs';

export default (
  booleanLiteral: BooleanLiteral,
  // state selector uneeded
  // childSynPresnoArgs uneeded
): BooleanLiteralPresAttrs => {
  return {
    attrs: {
      syntype: 'booleanLiteral',
      value: booleanLiteral.value,
    },
    childPresnoArgs: {
    },
  };
};
