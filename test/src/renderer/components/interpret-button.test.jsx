import React from 'react';
import { shallow } from 'enzyme';
import InterpretButton from '../../../../src/renderer/components/interpret-button.jsx';

it ('renders', () => {
  expect(shallow(
    <InterpretButton interpret={() => {}} />
  )).toMatchSnapshot();
});
