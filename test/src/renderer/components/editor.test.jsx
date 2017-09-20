import React from 'react';
import { shallow } from 'enzyme';
import editorStateStore from '../../../../src/editor-state-store.js'
import { interpretStage, Editor } from '../../../../src/renderer/components/editor.jsx';

const syntacticGraph = require('../../../data-mocks/syntactic-graph.json');

describe ('interpretStage', () => {
  const mockResult = {};

  beforeEach(() => {
    editorStateStore.dispatch = jest.fn();
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

describe ('Editor', () => {
  it ('renders', () => {
    const presentation = {
      stageful: syntacticGraph,
      result: syntacticGraph
    }

    expect(shallow(
      <Editor presentation={presentation} />
    )).toMatchSnapshot();
  });
})
