import React from 'react';
import FunctionCall from '../../../../../src/renderer/components/syntactic-nodes/function-call.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

const functionCallPres = require('../../../../data-mocks/presentations/function-call.json');

describe ('BooleanLiteral', () => {
  const validProps = {
    codePresentation: functionCallPres
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <FunctionCall codePresentation={validProps.codePresentation} />
    );
  });
})
