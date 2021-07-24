import focuses from './helpers/focuses';
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { Focus } from '../../../types/editor-state/focus';
import type { PresentLanguageIntegration } from '../../../types/language-integration/present-language-integration';
import type { BooleanLiteral } from '../types/synos/boolean-literal';
import type { BooleanLiteralPresAttrs } from '../types/presentations/presno-attrs/boolean-literal-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  booleanLiteral: BooleanLiteral,
  scope: {},
  focus: Focus | null | undefined,
): BooleanLiteralPresAttrs => {
  const { value } = booleanLiteral;
  const { focused } = focuses(focus, booleanLiteral.id);
  return {
    syntype: 'booleanLiteral',
    value,
    focused,
    presnoFocused: null,
    // can't edit name
    charFocused: null,
    // can't edit name
    valid: true,
  };
};
