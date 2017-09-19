import React from 'react';
import { shallow } from 'enzyme';
import editorStateStore from '../../../../src/editor-state-store.js'
import { interpretStage, Editor } from '../../../../src/renderer/components/editor.jsx';

describe ('interpretStage', () => {
  const syntacticGraph = {};
  const mockResult = {};

  beforeEach(() => {
    editorStateStore.dispatch = jest.fn();
    interpretStage(syntacticGraph);
  })

  xit ('interprets the stageful', () => { // scope trouble mocking interpreter
    expect(interpreter).toHaveBeenCalledWith(syntacticGraph);
  });

  it ('dispatches an UPDATE_RESULT action', () => {
    expect(editorStateStore.dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_RESULT',
      result: mockResult
    });
  });
})

describe ('Editor', () => {
  it ('renders', () => {
    const syntacticGraph = {
      klass: 'numberLiteral',
      data: 0
    }

    const presentation = {
      presentation: {
        stageful: syntacticGraph
      },
      result: syntacticGraph
    }


    expect(shallow(
      <Editor presentation={presentation} />
    )).toMatchSnapshot();
  });
})
