import type { Store } from 'redux';

import presentFocusedSyntree from './presenters/present-focused-syntree';
import presentSyntree from './presenters/present-syntree';

import type { StateSelector } from '../types/state-selector';
import type { EditorState } from '../types/editor-state';
import type { EditorPresentation } from '../types/presenter/editor-presentation';
import type { LanguageIntegration } from '../types/language-integration';
import type { PresentLanguageIntegration } from '../types/language-integration/present-language-integration';

const generatePresentation = (
  state: StateSelector,
  editorState: EditorState,
  integration: LanguageIntegration,
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
   integration as PresentLanguageIntegration,
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
      integration as PresentLanguageIntegration,
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
  integration: LanguageIntegration,
): (
  () => EditorPresentation
) => {
  // eslint-disable-line function-paren-newline
  return () => {
    const editorState: EditorState = editorStateStore.getState();
    return generatePresentation(state, editorState, integration);
  };
};
