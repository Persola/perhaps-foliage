import React from 'react';
import BooleanLiteral from '../../../../../src/renderer/components/syntactic-nodes/boolean-literal.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

const booleanLiteral = require('../../../../data-mocks/syntactic-nodes/boolean-literal.json');

describe ('BooleanLiteral', () => {
  const validProps = {
    syntacticGraph: booleanLiteral
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <BooleanLiteral syntacticGraph={validProps.syntacticGraph} />
    );
  });
})
