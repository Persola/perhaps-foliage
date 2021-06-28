import * as React from 'react';
import InterpretButton from '../../../../src/renderer/components/interpret-button.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

it ('renders', () => {
  expectSnapshotMatch(
    <InterpretButton interpret={() => {}} />
  );
});
