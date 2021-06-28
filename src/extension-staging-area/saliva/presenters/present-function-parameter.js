// @flow
import type { PresnoMap } from '../../../types/presenter/presno-map.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { FunctionParameter } from '../types/synos/function-parameter.js';
import type { FunctionParameterPresAttrs } from '../types/presentations/presno-attrs/function-parameter-attrs.js';

export default (
  grammar: GrammarName,
  presnoMap: PresnoMap,
  parameter: FunctionParameter,
  scope: {},
  getSyno: Function,
  focus: (Focus | false),
): FunctionParameterPresAttrs => ({
  syntype: 'functionParameter',
  slot: parameter.name,
  valueSyntype: parameter.valueSyntype,
  focused: focus && (parameter.id === focus.synoId) && (focus.presnoIndex === false),
  presnoFocused: focus && (parameter.id === focus.synoId) && focus.presnoIndex,
  charFocused: focus && (parameter.id === focus.synoId) && focus.charIndex,
});
