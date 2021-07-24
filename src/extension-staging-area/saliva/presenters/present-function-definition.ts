import primitives from "../primitives.yml";
import focuses from "./helpers/focuses";
import presentParameters from "./present-function-definition/present-parameters";
import type { StateSelector } from "../../../types/state-selector";
import type { MutablePresnoMap } from "../../../types/presenter/mutable-presno-map";
import type { PresentSyno } from "../../../types/presenter/present-syno";
import type { PresnoRef } from "../../../types/presenter/presno-ref";
import type { Focus } from "../../../types/editor-state/focus";
import type { PresentLanguageIntegration } from "../../../types/language-integration/present-language-integration";
import type { FunctionDefinition } from "../types/synos/function-definition";
import type { FunctionDefPresAttrs } from "../types/presentations/presno-attrs/function-definition-attrs";
const primitiveIds = Object.keys(primitives);
export default ((state: StateSelector, integration: PresentLanguageIntegration, presnoMap: MutablePresnoMap, funkshunDef: FunctionDefinition, scope: {}, focus: Focus | null | undefined, presentSyno: PresentSyno): FunctionDefPresAttrs => {
  let valid = true;
  let body: PresnoRef | null | undefined = null;

  if (!funkshunDef.body) {
    if (!primitiveIds.includes(funkshunDef.id)) {
      valid = false;
    }
  } else {
    body = {
      presnoRef: true,
      id: presentSyno(state, integration, presnoMap, funkshunDef.id, state.getSyno(funkshunDef.body.id), scope, focus, presentSyno)
    };
  }

  const {
    focused,
    presnoFocused,
    charFocused
  } = focuses(focus, funkshunDef.id);
  return {
    syntype: 'functionDefinition',
    name: funkshunDef.name,
    parameters: presentParameters(state, integration, presnoMap, funkshunDef.id, funkshunDef.parameters, scope, focus, presentSyno),
    focused,
    presnoFocused,
    charFocused,
    body,
    valid
  };
});