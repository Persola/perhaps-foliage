import React from 'react';
import { shallow } from 'enzyme';
import SyntacticalNode from '../../../src/renderer/components/syntactical-node.jsx';

describe ('SyntacticalNode', () => {
  const validProps = {
    serialization: {
      klass: 'numberLiteral',
      data: 678,
    }
  }

  it ('renders', () => {
    const { serialization } = validProps

    expect(shallow(
      <SyntacticalNode serialization={serialization} />
    )).toMatchSnapshot();
  });

  it ('only works for numberLiterals', () => {
    const serialization = Object.assign({}, validProps.serialization, {
      klass: 'otherKlass',
    })

    expect( () => {
      shallow(
        <SyntacticalNode serialization={serialization} />
      )
    }).toThrow('no types yet');
  });
})
