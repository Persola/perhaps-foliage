// @flow
import deriveInverseReferenceMap from '../derive-inverse-reference-map';
import codeLoader from '../../code-loader/code-loader.js';
import ascendToRoot from '../../syntree-utils/ascend-to-root.js';

import type { SynoMap } from '../../types/syno-map.js';
import type { MutableEditorState } from '../../types/mutable-editor-state.js';
import type { EndAsyncSyntreeLoad } from '../../types/actions/end-syntree-load';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  action: EndAsyncSyntreeLoad,
  draftState: MutableEditorState,
): void => {
  const salivaPrimitives: SynoMap = codeLoader.loadSyntreeFromFileSystem('salivaPrimitives');
  const newSyntree: SynoMap = action.newSynoMap;
  const rootSyno = ascendToRoot(Object.keys(newSyntree)[0], state);
  const newSyntreeWithPrimitives = { ...newSyntree, ...salivaPrimitives };

  draftState.synoMap = newSyntreeWithPrimitives;
  draftState.inverseReferenceMap = deriveInverseReferenceMap(newSyntreeWithPrimitives, rootSyno.id);
  draftState.focus = {
    synoId: rootSyno.id,
    presnoIndex: false,
    charIndex: false,
  };
  draftState.resultSyntreeRootId = false;
  draftState.interpreting = false;
  draftState.resultOutdated = false;
  draftState.loadingSyntree = false;
};
