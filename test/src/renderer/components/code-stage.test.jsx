import React from 'react';
import { shallow } from 'enzyme';
import CodeStage from '../../../../src/renderer/components/code-stage.jsx';

it ('renders', () => {
  expect(shallow(
    <CodeStage stageful={{}} />
  )).toMatchSnapshot();
});
