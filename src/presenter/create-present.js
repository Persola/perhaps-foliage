// @flow
import presentFocusedSyntree from './presenters/present-focused-syntree.js';
import presentSyntree from './presenters/present-syntree.js';

import type { StateSelector } from '../types/state-selector.js';
import type { EditorState } from '../types/editor-state.js';
import type { EditorPresentation } from '../types/presenter/editor-presentation.js';
import type { ReduxStore } from '../types/redux-store.js';
import type { Renderer } from '../types/renderer.js';

const generatePresentation = (
  state: StateSelector,
  editorState: EditorState,
): EditorPresentation => {
  const {
    grammarName,
    focus,
    resultSyntreeRootId,
  } = editorState;

  return {
    stage: (
      !focus.synoId
        ? false
        : presentFocusedSyntree(
          state,
          grammarName,
          focus.synoId,
          {},
          focus,
        )
    ),
    result: (
      !resultSyntreeRootId
        ? false
        : presentSyntree(
          state,
          grammarName,
          resultSyntreeRootId,
          {},
          false,
        )
    ),
  };
};

export default (
  state: StateSelector,
  editorStateStore: ReduxStore,
  renderer: Renderer,
): ((void) => void) => { // eslint-disable-line function-paren-newline
  return () => {
    const editorState: EditorState = editorStateStore.getState();
    const presentation = generatePresentation(state, editorState);
    const { grammarName, resultOutdated, interpreting } = editorState;
    renderer.render(
      editorStateStore,
      presentation,
      grammarName,
      resultOutdated,
      interpreting,
    );
  };
};
