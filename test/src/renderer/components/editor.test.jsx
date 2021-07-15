import * as React from 'react';
import Editor from '../../../../src/renderer/components/editorx';
import expectSnapshotMatch from '../../../expect-snapshot-match';

import stagePresentation from '../../../data-mocks/presentations/function-callon';
import resultPresentation from '../../../data-mocks/presentations/boolean-literalon';

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
