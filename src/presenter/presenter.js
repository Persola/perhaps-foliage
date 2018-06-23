// @flow
import createSynoFetcher from '../syntree-utils/create-syno-fetcher.js'
import presentFocusedSyntree from './presenters/present-focused-syntree.js'
import presentSyntree from './presenters/present-syntree.js'

import type { EditorState } from '../types/editor-state.js'
import type { EditorPresentation } from '../types/presentations/editor-presentation.js'
import type { ReduxStore } from '../types/redux-store.js'
import type { Renderer } from '../types/renderer.js'

export default class Presenter {
  editorStateStore: ReduxStore;
  renderer: Renderer;

  constructor(
    editorStateStore: ReduxStore,
    renderer: Object
  ) {
    this.editorStateStore = editorStateStore;
    this.renderer = renderer;

    editorStateStore.subscribe(
      this.present.bind(this)
    );
  }

  present() {
    const editorState: EditorState = this.editorStateStore.getState();
    const presentation = this.generatePresentation(editorState);
    this.renderer.render(presentation, editorState.resultOutdated);
  }

  generatePresentation(editorState: EditorState): EditorPresentation {
    const { synoMap, stagedNodeId, resultNodeId } = editorState
    const getSyno = createSynoFetcher(synoMap);
    const stagedSyno = stagedNodeId ? synoMap[stagedNodeId] : false;
    const resultSyno = resultNodeId ? synoMap[resultNodeId] : false;

    if (!stagedSyno) {
      throw new Error('focus node not found in editor state')
    }

    return {
      stage: (!stagedSyno ? false : presentFocusedSyntree(stagedSyno, {}, getSyno, stagedNodeId)),
      result: (!resultSyno ? false : presentSyntree(resultSyno, {}, getSyno, false))
    };
  }
}
