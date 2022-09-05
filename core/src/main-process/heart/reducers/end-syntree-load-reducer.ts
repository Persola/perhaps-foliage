import type { StateSelector } from '../../../types/state-selector';
import type { EndAsyncSyntreeLoad } from '../../../types/actions/end-syntree-load';
import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';
import type { Warn } from '../../../types/cross-context/warn';
import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';

export default (
  state: StateSelector,
  action: EndAsyncSyntreeLoad,
  draftState: MutableEditorState,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring END_SYNTREE_LOAD action: no integration loaded');
    return;
  }

  if (action.newIngestedTree === null) {
    // load failed, just stop loading (error already surfaced in epic)
    draftState.loadingSyntree = false;
    return;
  }

  const treeId = 'drug_in_tree';
  const newSyntree: RawSyntaxTree = action.newIngestedTree;
  const treeToAdd = {};
  treeToAdd[treeId] = newSyntree;

  Object.assign(draftState, {
    trees: {
      ...draftState.trees,
      ...treeToAdd,
    },
    editeeTreeId: treeId,
    resultTreeId: null,
    focus: {
      synoId: newSyntree.rootId,
      presnoIndex: null,
      budIndex: null,
      charIndex: null,
    },
    interpreting: false,
    resultOutdated: false,
    loadingSyntree: false,
  });
};
