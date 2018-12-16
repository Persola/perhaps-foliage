import React from 'react';
import BooleanLiteral from '../../../../../src/renderer/components/syntactic-nodes/boolean-literal.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

const booleanLiteralPres = require('../../../../data-mocks/presentations/boolean-literal.json');

describe ('BooleanLiteral', () => {
  const validProps = {
    getPresno: () => {}, // eslint-disable-line react/no-unused-prop-types
    presno: booleanLiteralPres
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <BooleanLiteral {...validProps} />
    );
  });
})
