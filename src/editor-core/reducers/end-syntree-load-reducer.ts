import deriveInverseReferenceMap from "../derive-inverse-reference-map";
import ascendToRoot from "../../syntree-utils/ascend-to-root";
import type { MutableSynoMap } from "../../types/mutable-syno-map";
import type { MutableEditorState } from "../../types/mutable-editor-state";
import type { EndAsyncSyntreeLoad } from "../../types/actions/end-syntree-load";
import type { StateSelector } from "../../types/state-selector";
export default (
  state: StateSelector,
  action: EndAsyncSyntreeLoad,
  draftState: MutableEditorState
): void => {
  if (state.integrationLoaded() === false) {
    console.warn("Ignoring END_SYNTREE_LOAD action: no integration loaded");
    return;
  }

  const newSyntree: MutableSynoMap = action.newSynoMap;
  const rootSyno = ascendToRoot(Object.keys(newSyntree)[0], newSyntree);
  Object.assign(draftState, {
    synoMap: newSyntree,
    inverseReferenceMap: deriveInverseReferenceMap(newSyntree, rootSyno.id),
    focus: {
      synoId: rootSyno.id,
      presnoIndex: null,
      charIndex: null,
    },
    resultSyntreeRootId: null,
    interpreting: false,
    resultOutdated: false,
    loadingSyntree: false,
  });
};
