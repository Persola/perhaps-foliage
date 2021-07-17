// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { Focus } from '../../../types/editor-state/focus';
import type { LanguageIntegration } from '../../../types/language-integration';
import type { BooleanLiteral } from '../types/synos/boolean-literal';
import type { BooleanLiteralPresAttrs } from '../types/presentations/presno-attrs/boolean-literal-attrs';

export default (
  state: StateSelector,
  integration: LanguageIntegration,
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
