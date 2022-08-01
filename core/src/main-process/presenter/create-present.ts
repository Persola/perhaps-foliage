import type { Store } from 'redux';

import presentTree from './presenters/present-tree';
import ascendToRoot from '../../syntree-utils/read-tree/ascend-to-root';

import type { StateSelector } from '../../types/state-selector';
import type { EditorState } from '../../types/editor-state';
import type { EditorPresentation } from '../../types/presenter/editor-presentation';
import type { MainsideLanguageIntegration } from '../../types/language-integration/mainside-language-integration';
import type { MainsidePresentLanguageIntegration } from '../../types/language-integration/mainside-present-language-integration';

const generatePresentation = (
  state: StateSelector,
  editorState: EditorState,
  integration: MainsideLanguageIntegration,
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
      integration as MainsidePresentLanguageIntegration,
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
      integration as MainsidePresentLanguageIntegration,
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
  integration: MainsideLanguageIntegration,
): (
  () => EditorPresentation
) => {
  // eslint-disable-line function-paren-newline
  return () => {
    const editorState: EditorState = editorStateStore.getState();
    return generatePresentation(state, editorState, integration);
  };
};
