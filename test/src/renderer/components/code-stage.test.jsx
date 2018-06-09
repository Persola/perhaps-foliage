import React from 'react';
import CodeView from '../../../../src/renderer/components/code-view.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const syntacticGraph = require('../../../data-mocks/syntactic-graph.json');

describe ('codeLoader', () => {
  describe ('with normal props', () => {
    const code = syntacticGraph;

    it ('renders', () => {
      expectSnapshotMatch(
        <CodeView code={code} />
      );
    });
  });

  describe ('when the stageful is false', () => {
    const code = false;

    it ('renders', () => {
      expectSnapshotMatch(
        <CodeView code={code} />
      );
    });
  });
});
