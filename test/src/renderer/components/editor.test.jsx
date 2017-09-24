import React from 'react';
import Editor from '../../../../src/renderer/components/editor.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const syntacticGraph = require('../../../data-mocks/syntactic-graph.json');

describe ('Editor', () => {
  const interpret = jest.fn()

  describe ('with normal props', () => {
    const presentation = {
      stageful: syntacticGraph,
      result: syntacticGraph
    }

    it ('renders', () => {
      expectSnapshotMatch(
        <Editor presentation={presentation} interpret={interpret} />
      )
    });
  });

  describe ('with result as false', () => {
    const presentation = {
      stageful: syntacticGraph,
      result: false
    }

    it ('renders', () => {
      expectSnapshotMatch(
        <Editor presentation={presentation} interpret={interpret} />
      )
    });
  });
})
