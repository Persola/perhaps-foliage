import createInterpretForStore from '../../../src/interpreter/create-interpret-for-store.js';
import editorStateStore from '../../../src/editor-state-store/editor-state-store.js'

describe ('interpretStage', () => {
  const mockResult = {};
  const interpreter = jest.fn();
  let currentEditorState;
  let interpret; // eslint-disable-line no-unused-vars

  beforeEach(() => {
    editorStateStore.dispatch = jest.fn();
    interpret = createInterpretForStore(editorStateStore);
    currentEditorState = editorStateStore.getState();
    interpret();
  })

  xit ('interprets the stageful', () => {
    expect(interpreter).toHaveBeenCalledWith(currentEditorState.stageful);
  });

  xit ('dispatches an UPDATE_RESULT action', () => {
    expect(editorStateStore.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_RESULT',
      result: mockResult
    });
  });
})
