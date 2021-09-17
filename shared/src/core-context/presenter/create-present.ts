import type { Store } from 'redux';

import presentTree from './presenters/present-tree';
import ascendToRoot from '../../syntree-utils/ascend-to-root';

import type { StateSelector } from '../../types/state-selector';
import type { EditorState } from '../../types/editor-state';
import type { EditorPresentation } from '../../types/presenter/editor-presentation';
import type { CoresideLanguageIntegration } from '../../types/language-integration/coreside-language-integration';
import type { CoresidePresentLanguageIntegration } from '../../types/language-integration/coreside-present-language-integration';

const generatePresentation = (
  state: StateSelector,
  editorState: EditorState,
  integration: CoresideLanguageIntegration,
): EditorPresentation => {
  const { focus, resultSyntreeRootId } = editorState;
  let stage;

  if (
    !state.integrationLoaded()
    || !state.synoMap()
    || !state.focusedSynoId()
  ) {
    stage = null;
  } else {
    const entryId = ascendToRoot(focus.synoId, state.synoMap()).id;

    stage = presentTree(
      state,
      integration as CoresidePresentLanguageIntegration,
      entryId,
      state.synoMap(),
      focus,
    );
  }

  let result;

  if (!resultSyntreeRootId) {
    result = null;
  } else {
    result = presentTree(
      state,
      integration as CoresidePresentLanguageIntegration,
      resultSyntreeRootId,
      state.resultTree(),
      null,
    );
  }

  return {
    stage,
    result,
  };
};

export default (
  state: StateSelector,
  editorStateStore: Store,
  integration: CoresideLanguageIntegration,
): (
  () => EditorPresentation
) => {
  // eslint-disable-line function-paren-newline
  return () => {
    const editorState: EditorState = editorStateStore.getState();
    return generatePresentation(state, editorState, integration);
  };
};
