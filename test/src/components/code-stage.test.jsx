import React from 'react';
import { shallow } from 'enzyme';
import { CodeStage } from '../../../src/components/code-stage.jsx';

describe ('CodeStage', () => {
  it ('renders', () => {
    expect(shallow(
      <CodeStage />
    )).toMatchSnapshot();
  });
})
