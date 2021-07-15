import * as React from 'react';
import BooleanLiteral from '../../../../../src/extension-staging-area/saliva/renderer/components/syntactic-nodes/boolean-literalx';
import expectSnapshotMatch from '../../../../expect-snapshot-match';

import booleanLiteralPres from '../../../../data-mocks/presentations/boolean-literalon';

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
