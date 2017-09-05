const RENDER_ACTION_TYPE = 'RENDER';

export default class Presenter {
  constructor(editorStateStore, presentationStore, syntacticGraphsIdentical) {
    this.presentationStore = presentationStore;
    this.editorStateStore = editorStateStore;
    this.syntacticGraphsIdentical = syntacticGraphsIdentical;

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
    const omniValue = {
      klass: 'numberLiteral',
      data: 1
    }

    if (!this.syntacticGraphsIdentical(editorState, { stageful: omniValue })) {
      throw new Error('Only the omnivalue can be presented');
    }

    return editorState;
  }
}
