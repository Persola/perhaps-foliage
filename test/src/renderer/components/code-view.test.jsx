import React from 'react';
import CodeView from '../../../../src/renderer/components/code-view.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const codePresentation = require('../../../data-mocks/presentations/boolean-literal.json');

describe ('CodeView', () => {
  describe ('with normal props', () => {
    it ('renders', () => {
      expectSnapshotMatch(
        <CodeView codePresentation={codePresentation} />
      );
    });
  });

  describe ('when the stageful is false', () => {
    it ('renders', () => {
      expectSnapshotMatch(
        <CodeView codePresentation={false} />
      );
    });
  });
});
