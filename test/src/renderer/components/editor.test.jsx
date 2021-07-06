import * as React from 'react';
import Editor from '../../../../src/renderer/components/editor.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

import stagePresentation from '../../../data-mocks/presentations/function-call.json';
import resultPresentation from '../../../data-mocks/presentations/boolean-literal.json';

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
