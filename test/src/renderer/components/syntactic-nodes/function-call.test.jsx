import * as React from 'react';
import FunctionCall from '../../../../../src/extension-staging-area/saliva/renderer/components/syntactic-nodes/function-call.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

const functionCallPres = require('../../../../data-mocks/presentations/function-call.json');

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
