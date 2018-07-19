import createInterpretForStore from '../../../src/interpreter/create-interpret-for-store.js';
import editorStateStore from '../../../src/editor-core/editor-state-store.js'

describe ('interpretStage', () => {
  const mockResult = {};
  const interpreter = jest.fn();
  let currentEditorState;
  let interpret;

  beforeEach(() => {
    editorStateStore.dispatch = jest.fn();
    interpret = createInterpretForStore(editorStateStore);
    currentEditorState = editorStateStore.getState();
    interpret();
  })

  xit ('interprets the stageful', () => {
    expect(interpreter).toHaveBeenCalledWith(currentEditorState.stageful);
  });

  xit ('dispatches an END_INTERPRETATION action', () => {
    expect(editorStateStore.dispatch).toHaveBeenCalledWith({
      type: 'END_INTERPRETATION',
      result: mockResult
    });
  });
})
