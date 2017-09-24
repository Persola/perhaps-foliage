import React from 'react';
import CodeStage from '../../../../src/renderer/components/code-stage.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const syntacticGraph = require('../../../data-mocks/syntactic-graph.json');

describe ('codeLoader', () => {
  describe ('with normal props', () => {
    const stageful = syntacticGraph;

    it ('renders', () => {
      expectSnapshotMatch(
        <CodeStage stageful={stageful} />
      );
    });
  });

  describe ('when the stageful is false', () => {
    const stageful = false;

    it ('renders', () => {
      expectSnapshotMatch(
        <CodeStage stageful={stageful} />
      );
    });
  });
});
