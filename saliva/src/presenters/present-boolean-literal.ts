import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/coreside-present-language-integration';

import type { BooleanLiteral } from '../types/synos/boolean-literal';
import type { BooleanLiteralPresAttrs } from '../types/presentations/presno-attrs/boolean-literal-attrs';

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  booleanLiteral: BooleanLiteral,
  scope: Record<string, unknown>,
  focus: Focus | null,
): BooleanLiteralPresAttrs => {
  return {
    syntype: 'booleanLiteral',
    value: booleanLiteral.value,
  };
};
