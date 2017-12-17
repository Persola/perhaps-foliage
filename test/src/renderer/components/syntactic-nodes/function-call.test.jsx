import React from 'react';
import FunctionCall from '../../../../../src/renderer/components/syntactic-nodes/function-call.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

const functionCall = require('../../../../data-mocks/syntactic-nodes/function-call.json');

describe ('BooleanLiteral', () => {
  const validProps = {
    syntacticGraph: functionCall
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <FunctionCall syntacticGraph={validProps.syntacticGraph} />
    );
  });
})
