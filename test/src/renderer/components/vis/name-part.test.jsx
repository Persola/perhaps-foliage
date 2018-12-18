import React from 'react';
import NamePart from '../../../../../src/renderer/components/vis/name-part.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

describe ('BooleanLiteral', () => {
  const validProps = {
    namePart: "Blueberry"
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <NamePart namePart={validProps.namePart} focused={false} />
    );
  });
})
