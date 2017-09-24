// @flow
import type { editorState } from '../types/editor-state.js' // eslint-disable-line no-unused-vars
import type { presentation } from '../types/presentation.js' // eslint-disable-line no-unused-vars
import type { reduxStore } from '../types/redux-store.js' // eslint-disable-line no-unused-vars
import type { renderer } from '../types/renderer.js' // eslint-disable-line no-unused-vars

export default class Presenter {
  editorStateStore: reduxStore;
  renderer: renderer;

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
    const editorState = this.editorStateStore.getState();
    const presentation = this.generatePresentation(editorState);
    this.renderer.render(presentation);
  }

  generatePresentation(editorState: editorState): presentation {
    return editorState;
  }
}
