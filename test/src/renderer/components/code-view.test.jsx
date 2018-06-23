import React from 'react';
import CodeView from '../../../../src/renderer/components/code-view.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const codePresentation = require('../../../data-mocks/presentations/boolean-literal.json');

describe ('CodeView', () => {
  describe ('with normal props', () => {
    it ('renders', () => {
      expectSnapshotMatch(
        <CodeView presnos={presnos} presnoId={presnoId} getPresno={getPresno} />
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
