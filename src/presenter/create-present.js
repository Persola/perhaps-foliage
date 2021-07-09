// @flow
import createSynoFetcher from '../syntree-utils/create-syno-fetcher.js';
import presentFocusedSyntree from './presenters/present-focused-syntree.js';
import presentSyntree from './presenters/present-syntree.js';

import type { EditorState } from '../types/editor-state.js';
import type { EditorPresentation } from '../types/presenter/editor-presentation.js';
import type { ReduxStore } from '../types/redux-store.js';
import type { Renderer } from '../types/renderer.js';

const generatePresentation = (editorState: EditorState): EditorPresentation => {
  const {
    synoMap,
    grammarName,
    focus,
    resultSyntreeRootId,
  } = editorState;
  const getSyno = createSynoFetcher(synoMap);

  return {
    stage: (
      !focus.synoId
        ? false
        : presentFocusedSyntree(grammarName, focus.synoId, {}, getSyno, focus)
    ),
    result: (
      !resultSyntreeRootId
        ? false
        : presentSyntree(grammarName, resultSyntreeRootId, {}, getSyno, false)
    ),
  };
};

export default (
  editorStateStore: ReduxStore,
  renderer: Renderer,
): ((void) => void) => { // eslint-disable-line function-paren-newline
  const present = () => {
    const editorState: EditorState = editorStateStore.getState();
    const presentation = generatePresentation(editorState);
    const { grammarName, resultOutdated, interpreting } = editorState;
    renderer.render(
      editorStateStore,
      presentation,
      grammarName,
      resultOutdated,
      interpreting,
    );
  };

  editorStateStore.subscribe(present);

  return present;
};
