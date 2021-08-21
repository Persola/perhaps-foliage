import type { Store } from 'redux';

import presentFocusedSyntree from './presenters/present-focused-syntree';
import presentSyntree from './presenters/present-syntree';

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
    stage = presentFocusedSyntree(
      state,
   integration as CoresidePresentLanguageIntegration,
   focus.synoId,
   {},
   focus,
    );
  }

  let result;

  if (!resultSyntreeRootId) {
    result = null;
  } else {
    result = presentSyntree(
      state,
      integration as CoresidePresentLanguageIntegration,
      resultSyntreeRootId,
      {},
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
