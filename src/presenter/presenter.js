// @flow
type reduxStore = Object;
type state = Object;
type renderer = Object;

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

  generatePresentation(editorState: state): state {
    return editorState;
  }
}
