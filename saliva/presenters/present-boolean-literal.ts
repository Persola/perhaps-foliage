import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';

import focuses from './helpers/focuses';

import type { BooleanLiteral } from '../types/synos/boolean-literal';
import type { BooleanLiteralPresAttrs } from '../types/presentations/presno-attrs/boolean-literal-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  booleanLiteral: BooleanLiteral,
  scope: Record<string, unknown>,
  focus: Focus | null,
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
