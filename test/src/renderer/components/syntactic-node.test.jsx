import React from 'react';
import { shallow } from 'enzyme';
import SyntacticNode from '../../../../src/renderer/components/syntactic-node.jsx';

describe ('SyntacticNode', () => {
  const validProps = {
    serialization: {
      klass: 'booleanLiteral',
      data: 678,
    }
  }

  it ('renders', () => {
    const { serialization } = validProps

    expect(shallow(
      <SyntacticNode serialization={serialization} />
    )).toMatchSnapshot();
  });

  it ('only works for booleanLiterals', () => {
    const serialization = Object.assign({}, validProps.serialization, {
      klass: 'otherKlass',
    })

    expect( () => {
      shallow(
        <SyntacticNode serialization={serialization} />
      )
    }).toThrow('no types yet');
  });
})
