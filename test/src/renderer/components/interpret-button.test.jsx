import * as React from 'react';
import InterpretButton from '../../../../src/renderer/components/interpret-buttonx';
import expectSnapshotMatch from '../../../expect-snapshot-match';

it ('renders', () => {
  expectSnapshotMatch(
    <InterpretButton interpret={() => {}} />
  );
});
