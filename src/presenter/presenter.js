// @flow
import retrieveNode from '../retrieve-node.js'
import type { editorState } from '../types/editor-state.js' // eslint-disable-line no-unused-vars
import type { presentation } from '../types/presentation.js' // eslint-disable-line no-unused-vars
import type { reduxStore } from '../types/redux-store.js' // eslint-disable-line no-unused-vars
import type { aRenderer } from '../types/renderer.js' // eslint-disable-line no-unused-vars

export default class Presenter {
  editorStateStore: reduxStore;
  renderer: aRenderer;

  constructor(
    editorStateStore: reduxStore,
    renderer: Object
  ) {
    this.editorStateStore = editorStateStore;
    this.renderer = renderer;

    editorStateStore.subscribe(
      this.present.bind(this)
    );
  }

  present() {
    const editorState: editorState = this.editorStateStore.getState();
    const presentation = this.generatePresentation(editorState);
    this.renderer.render(presentation);
  }

  generatePresentation(editorState: editorState): presentation {
    const stagedGraph = editorState.graphs[editorState.stagedGraphKey];
    const result = editorState.graphs[editorState.resultGraphKey];
    const focusedNode = retrieveNode(stagedGraph, editorState.focusedNodePath);

    if (focusedNode === false) {
      throw new Error('focus node not found in editor state')
    }

    return {
      stage: focusedNode,
      result
    };
  }
}
