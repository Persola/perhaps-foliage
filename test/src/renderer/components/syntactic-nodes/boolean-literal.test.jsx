import React from 'react';
import BooleanLiteral from '../../../../../src/renderer/components/syntactic-nodes/boolean-literal.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

const booleanLiteralPres = require('../../../../data-mocks/presentations/boolean-literal.json');

describe ('BooleanLiteral', () => {
  const validProps = {
    codePresentation: booleanLiteralPres
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <BooleanLiteral codePresentation={validProps.codePresentation} />
    );
  });
})
