// @flow
const RENDER_ACTION_TYPE = 'RENDER';

type reduxStore = Object
type state = Object

export default class Presenter {
  editorStateStore: reduxStore;
  presentationStore: reduxStore;
  validEditorState: (state) => boolean;

  constructor(
    editorStateStore: reduxStore,
    presentationStore: reduxStore,
    validEditorState: Function
  ) {
    this.editorStateStore = editorStateStore;
    this.presentationStore = presentationStore;
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

  generatePresentation(editorState: state): state {
    if (!this.validEditorState(editorState)) {
      throw new Error('Provided editor state is invalid');
    }

    return editorState;
  }
}
