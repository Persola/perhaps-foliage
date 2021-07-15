// @flow
import presentFocusedSyntree from './presenters/present-focused-syntree';
import presentSyntree from './presenters/present-syntree';

import type { StateSelector } from '../types/state-selector';
import type { EditorState } from '../types/editor-state';
import type { EditorPresentation } from '../types/presenter/editor-presentation';
import type { ReduxStore } from '../types/redux-store';
import type { Renderer } from '../types/renderer';

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
