// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { Focus } from '../../../types/editor-state/focus';
import type { LanguageIntegration } from '../../../types/language-integration';
import type { FunctionParameter } from '../types/synos/function-parameter';
import type { FunctionParameterPresAttrs } from '../types/presentations/presno-attrs/function-parameter-attrs';

export default (
  state: StateSelector,
  integration: LanguageIntegration,
  presnoMap: MutablePresnoMap,
  parameter: FunctionParameter,
  scope: {},
  focus: (Focus | false),
): FunctionParameterPresAttrs => ({
  syntype: 'functionParameter',
  slot: parameter.name,
  valueSyntype: parameter.valueSyntype,
  focused: focus && (parameter.id === focus.synoId) && (focus.presnoIndex === false),
  presnoFocused: focus && (parameter.id === focus.synoId) && focus.presnoIndex,
  charFocused: focus && (parameter.id === focus.synoId) && focus.charIndex,
});
