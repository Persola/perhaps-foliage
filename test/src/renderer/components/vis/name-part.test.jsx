import React from 'react';
import NamePart from '../../../../../src/renderer/components/vis/name-part.jsx';
import expectSnapshotMatch from '../../../../expect-snapshot-match.js';

describe ('BooleanLiteral', () => {
  const validProps = {
    namePart: "Blueberry",
    focused: false,
    charFocused: false
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <NamePart {...validProps} />
    );
  });
})
