import React from 'react';
import { shallow } from 'enzyme';
import SyntacticNode from '../../../../src/renderer/components/syntactic-node.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const codePresentation = require('../../../data-mocks/presentations/boolean-literal.json');

describe ('SyntacticNode', () => {
  const validProps = { codePresentation }

  it ('renders', () => {
    expectSnapshotMatch(
      <SyntacticNode codePresentation={validProps.codePresentation} />
    );
  });

  it ('only works for booleanLiterals', () => {
    const nonBooleanGraph = Object.assign({}, validProps.codePresentation, {
      klass: 'otherKlass',
    })

    expect( () => {
      shallow(
        <SyntacticNode codePresentation={nonBooleanGraph} />
      )
    }).toThrow('no types yet');
  });
})
