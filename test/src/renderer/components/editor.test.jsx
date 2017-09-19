import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../../../../src/renderer/components/editor.jsx';

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
