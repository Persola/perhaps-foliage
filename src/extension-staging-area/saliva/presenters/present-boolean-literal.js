// @flow
import type { StateSelector } from '../../../types/state-selector.js';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { BooleanLiteral } from '../types/synos/boolean-literal.js';
import type { BooleanLiteralPresAttrs } from '../types/presentations/presno-attrs/boolean-literal-attrs.js';

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  booleanLiteral: BooleanLiteral,
  scope: {},
  focus: (Focus | false),
): BooleanLiteralPresAttrs => {
  const { value } = booleanLiteral;
  return {
    syntype: 'booleanLiteral',
    value,
    focused: focus && (booleanLiteral.id === focus.synoId),
    presnoFocused: false, // can't edit name
    charFocused: false, // can't edit name
    valid: true,
  };
};
