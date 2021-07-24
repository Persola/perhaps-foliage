import focuses from "./helpers/focuses";
import type { StateSelector } from "../../../types/state-selector";
import type { MutablePresnoMap } from "../../../types/presenter/mutable-presno-map";
import type { Focus } from "../../../types/editor-state/focus";
import type { PresentLanguageIntegration } from "../../../types/language-integration/present-language-integration";
import type { VariableRef } from "../types/synos/variable-ref";
import type { VariableRefPresAttrs } from "../types/presentations/presno-attrs/variable-ref-attrs";
export default (
  state: StateSelector,
  integration: PresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  variableRef: VariableRef,
  scope: {},
  focus: Focus | null | undefined
): VariableRefPresAttrs => {
  let valid = true;
  let name: string | null | undefined = null;

  if (!variableRef.referent) {
    valid = false;
  } else {
    const vr = state.getSyno(variableRef.referent.id);
    if (vr.syntype !== "functionParameter") throw new Error();
    name = vr.name;
  }

  const { focused, presnoFocused, charFocused } = focuses(
    focus,
    variableRef.id
  );
  return {
    syntype: "variableRef",
    valueSyntype: "booleanLiteral",
    name,
    focused,
    presnoFocused,
    charFocused,
    valid,
  };
};
