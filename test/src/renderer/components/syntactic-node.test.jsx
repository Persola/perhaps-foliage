import React from 'react';
import { shallow } from 'enzyme';
import SyntacticNode from '../../../../src/renderer/components/syntactic-node.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const syntacticGraph = require('../../../data-mocks/syntactic-graph.json');

describe ('SyntacticNode', () => {
  const validProps = { syntacticGraph }

  it ('renders', () => {
    expectSnapshotMatch(
      <SyntacticNode syntacticGraph={validProps.syntacticGraph} />
    );
  });

  it ('only works for booleanLiterals', () => {
    const nonBooleanGraph = Object.assign({}, validProps.syntacticGraph, {
      klass: 'otherKlass',
    })

    expect( () => {
      shallow(
        <SyntacticNode syntacticGraph={nonBooleanGraph} />
      )
    }).toThrow('no types yet');
  });
})
