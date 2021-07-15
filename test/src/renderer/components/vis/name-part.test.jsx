import * as React from 'react';
import NamePart from '../../../../../src/renderer/components/vis/name-partx';
import expectSnapshotMatch from '../../../../expect-snapshot-match';

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
