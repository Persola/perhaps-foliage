import * as React from 'react';
import FunctionCall from '../../../../../src/extension-staging-area/saliva/renderer/components/syntactic-nodes/function-callx';
import expectSnapshotMatch from '../../../../expect-snapshot-match';

import functionCallPres from '../../../../data-mocks/presentations/function-callon';

describe ('functionCall', () => {
  const validProps = {
    getPresno: () => {},
    presno: functionCallPres
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <FunctionCall {...validProps} />
    );
  });
})
