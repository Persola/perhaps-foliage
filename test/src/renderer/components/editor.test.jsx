import React from 'react';
import Editor from '../../../../src/renderer/components/editor.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const stagePresentation = require('../../../data-mocks/presentations/function-call.json');
const resultPresentation = require('../../../data-mocks/presentations/boolean-literal.json');

describe ('Editor', () => {
  const interpret = jest.fn()

  describe ('with normal props', () => {
    const presentation = {
      stage: stagePresentation,
      result: resultPresentation
    }

    it ('renders', () => {
      expectSnapshotMatch(
        <Editor presentation={presentation} interpret={interpret} />
      )
    });
  });
})
