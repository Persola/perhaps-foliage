import interpreter from './interpreter.js'

export default editorStateStore => {
  return () => {
    const editorState = editorStateStore.getState();
    editorStateStore.dispatch({
      type: 'UPDATE_RESULT',
      result: interpreter(editorState.stageful)
    });
  };
}
