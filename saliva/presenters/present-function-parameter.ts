import type { StateSelector } from 'saliva-repl/dist/types/state-selector';
import type { MutablePresnoMap } from 'saliva-repl/dist/types/presenter/mutable-presno-map';
import type { Focus } from 'saliva-repl/dist/types/editor-state/focus';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';

import focuses from './helpers/focuses';

import type { FunctionParameter } from '../types/synos/function-parameter';
import type { FunctionParameterPresAttrs } from '../types/presentations/presno-attrs/function-parameter-attrs';

export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  parameter: FunctionParameter,
  scope: Record<string, unknown>,
  focus: Focus | null,
): FunctionParameterPresAttrs => {
  const { focused, presnoFocused, charFocused } = focuses(focus, parameter.id);
  return {
    syntype: 'functionParameter',
    slot: parameter.name,
    valueSyntype: parameter.valueSyntype,
    focused,
    presnoFocused,
    charFocused,
  };
};
