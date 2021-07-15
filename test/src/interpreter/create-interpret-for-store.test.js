import createInterpretForStore from '../../../src/extension-staging-area/saliva/interpreter/create-interpret-for-store';
import editorStateStore from '../../../src/editor-core/editor-state-store'

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
