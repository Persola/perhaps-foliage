// @flow
import createSynoFetcher from '../syntree-utils/create-syno-fetcher.js'
import presentFocusedSyno from './presenters/present-focused-syno.js'
import presentSyno from './presenters/present-syno.js'

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
    const { graphs, stagedNodeId, resultNodeId } = editorState
    const getSyno = createSynoFetcher(graphs);
    const stagedSyno = stagedNodeId ? graphs[stagedNodeId] : false;
    const resultSyno = resultNodeId ? graphs[resultNodeId] : false;

    if (!stagedSyno) {
      throw new Error('focus node not found in editor state')
    }

    return {
      stage: presentFocusedSyno(stagedSyno, {}, getSyno, stagedNodeId),
      result: presentSyno(resultSyno, {}, getSyno, false)
    };
  }
}
