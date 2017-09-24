import createInterpretForStore from '../../../src/interpreter/create-interpret-for-store.js';
import editorStateStore from '../../../src/editor-state-store.js'

const syntacticGraph = require('../../data-mocks/syntactic-graph.json');

describe ('interpretStage', () => {
  const mockResult = {};
  let interpret; // eslint-disable-line no-unused-vars

  beforeEach(() => {
    editorStateStore.dispatch = jest.fn();
    interpret = createInterpretForStore(editorStateStore);
    interpretStage(syntacticGraph);
  })

  xit ('interprets the stageful', () => { // scope trouble mocking interpreter
    expect(interpreter).toHaveBeenCalledWith(syntacticGraph);
  });

  xit ('dispatches an UPDATE_RESULT action', () => { // scope trouble mocking interpreter
    expect(editorStateStore.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_RESULT',
      result: mockResult
    });
  });
})
