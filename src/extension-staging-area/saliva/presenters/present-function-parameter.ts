import focuses from "./helpers/focuses";
import type { StateSelector } from "../../../types/state-selector";
import type { MutablePresnoMap } from "../../../types/presenter/mutable-presno-map";
import type { Focus } from "../../../types/editor-state/focus";
import type { PresentLanguageIntegration } from "../../../types/language-integration/present-language-integration";
import type { FunctionParameter } from "../types/synos/function-parameter";
import type { FunctionParameterPresAttrs } from "../types/presentations/presno-attrs/function-parameter-attrs";
export default ((state: StateSelector, integration: PresentLanguageIntegration, presnoMap: MutablePresnoMap, parameter: FunctionParameter, scope: {}, focus: Focus | null | undefined): FunctionParameterPresAttrs => {
  const {
    focused,
    presnoFocused,
    charFocused
  } = focuses(focus, parameter.id);
  return {
    syntype: 'functionParameter',
    slot: parameter.name,
    valueSyntype: parameter.valueSyntype,
    focused,
    presnoFocused,
    charFocused
  };
});