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
    const validEditorState = candidateEditorState => {
      if (!Object.keys(candidateEditorState) === ['stageful']) {
        return false;
      }

      const { stageful } = candidateEditorState;

      if (!Object.keys(stageful) === ['klass', 'data']) {
        return false;
      }

      if (!stageful.klass === 'numberLiteral') {
        return false;
      }

      if (![0, 1].includes(stageful.data)) {
        return false;
      }

      return true;
    };

    if (!validEditorState(editorState)) {
      throw new Error('Only the omnivalue can be presented');
    }

    return editorState;
  }
}
