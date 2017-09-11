const RENDER_ACTION_TYPE = 'RENDER';

export default class Presenter {
  constructor(editorStateStore, presentationStore, validEditorState) {
    this.presentationStore = presentationStore;
    this.editorStateStore = editorStateStore;
    this.validEditorState = validEditorState;

    editorStateStore.subscribe(
      this.present.bind(this)
    );
  }

  present() {
    const editorState = this.editorStateStore.getState();
    const presentation = this.generatePresentation(editorState)
    this.presentationStore.dispatch({
      type: RENDER_ACTION_TYPE,
      presentation
    })
  }

  generatePresentation(editorState) {
    if (!this.validEditorState(editorState)) {
      throw new Error('Provided editor state is invalid');
    }

    return editorState;
  }
}
