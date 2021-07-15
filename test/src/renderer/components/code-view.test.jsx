import * as React from 'react';
import CodeView from '../../../../src/renderer/components/code-viewx';
import expectSnapshotMatch from '../../../expect-snapshot-match';

import codePresentation from '../../../data-mocks/presentations/boolean-literalon';

describe ('CodeView', () => {
  describe ('with normal props', () => {
    it ('renders', () => {
      expectSnapshotMatch(
        <CodeView codePresentation={codePresentation} outdated={false} />
      );
    });
  });

  describe ('when the stageful is false', () => {
    it ('renders', () => {
      expectSnapshotMatch(
        <CodeView codePresentation={false} outdated={false} />
      );
    });
  });
});
