import presentFocusedSyntree from "./presenters/present-focused-syntree";
import presentSyntree from "./presenters/present-syntree";
import type { StateSelector } from "../types/state-selector";
import type { EditorState } from "../types/editor-state";
import type { EditorPresentation } from "../types/presenter/editor-presentation";
import type { ReduxStore } from "../types/redux-store";
import type { Renderer } from "../types/renderer";
import type { LanguageIntegration } from "../types/language-integration";
import type { PresentLanguageIntegration } from "../types/language-integration/present-language-integration";

const generatePresentation = (
  state: StateSelector,
  editorState: EditorState,
  integration: LanguageIntegration
): EditorPresentation => {
  const { focus, resultSyntreeRootId } = editorState;
  let stage;

  if (
    !state.integrationLoaded() ||
    !state.synoMap() ||
    !state.focusedSynoId()
  ) {
    stage = null;
  } else {
    stage = presentFocusedSyntree(
      state, // $FlowFixMe: Flow doesn't look into selector interface
      integration as PresentLanguageIntegration, // $FlowFixMe: Flow doesn't look into selector interface
      focus.synoId,
      {},
      focus
    );
  }

  let result;

  if (!resultSyntreeRootId) {
    result = null;
  } else {
    result = presentSyntree(
      state, // $FlowFixMe: Flow doesn't look into selector interface
      integration as PresentLanguageIntegration,
      resultSyntreeRootId,
      {},
      null
    );
  }

  return {
    stage,
    result,
  };
};

export default (
  state: StateSelector,
  editorStateStore: ReduxStore,
  renderer: Renderer,
  integration: LanguageIntegration
): ((arg0: void) => void) => {
  // eslint-disable-line function-paren-newline
  return () => {
    const editorState: EditorState = editorStateStore.getState();
    const presentation = generatePresentation(state, editorState, integration);
    const { resultOutdated, interpreting } = editorState;
    renderer.render(
      editorStateStore,
      presentation,
      integration,
      resultOutdated,
      interpreting
    );
  };
};
