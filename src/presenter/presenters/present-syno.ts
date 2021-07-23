import type { StateSelector } from "../../types/state-selector";
import type { Syno } from "../../types/syno";
import type { SynoId } from "../../types/syno-id";
import type { Presno } from "../../types/presenter/presno";
import type { MutablePresnoMap } from "../../types/presenter/mutable-presno-map";
import type { PresentSyno } from "../../types/presenter/present-syno";
import type { Focus } from "../../types/editor-state/focus";
import type { PresentLanguageIntegration } from "../../types/language-integration/present-language-integration";
export default ((state: StateSelector, integration: PresentLanguageIntegration, presnoMap: MutablePresnoMap, parentId: SynoId | null | undefined, syno: Syno, scope: {}, focus: Focus | null | undefined, presentSyno: PresentSyno): SynoId => {
  const presenter = integration.presenters[syno.syntype];

  if (!(presenter instanceof Function)) {
    throw new Error(`language integration missing presenter for syntype '${syno.syntype}'`);
  }

  const presentationAttrs = presenter(state, integration, presnoMap, syno, scope, focus, presentSyno);
  const parent = !parentId ? false : {
    presnoRef: true,
    id: parentId
  };
  const presentation: Presno = { ...presentationAttrs,
    synoId: syno.id,
    parent
  };

  if (typeof presnoMap[presentation.synoId] !== 'undefined') {
    throw new Error('attempted to overwrite presno!');
  }

  presnoMap[presentation.synoId] = presentation;
  return presentation.synoId;
});