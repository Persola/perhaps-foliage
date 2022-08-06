import type { Store } from 'redux';

import presentTree from './presenters/present-tree';
import ascendToRoot from '../../syntree-utils/read-tree/ascend-to-root';

import type { StateSelector } from '../../types/state-selector';
import type { EditorState } from '../../types/editor-state';
import type { EditorPresentation } from '../../types/presenter/editor-presentation';
import type { MainsideLangInt } from '../../types/language-integration/interfaces/mainside/mainside-lang-int';
import type { MainsidePresentLangInt } from '../../types/language-integration/interfaces/mainside/mainside-present-lang-int';

const generatePresentation = (
  state: StateSelector,
  editorState: EditorState,
  integration: MainsideLangInt,
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
      integration as MainsidePresentLangInt,
      entryId,
      focus,
    );
  }

  let result;

  if (!resultSyntreeRootId) {
    result = null;
  } else {
    result = presentTree(
      state,
      integration as MainsidePresentLangInt,
      resultSyntreeRootId,
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
  integration: MainsideLangInt,
): (
  () => EditorPresentation
) => {
  // eslint-disable-line function-paren-newline
  return () => {
    const editorState: EditorState = editorStateStore.getState();
    return generatePresentation(state, editorState, integration);
  };
};
