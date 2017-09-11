import React from 'react';
import ReactDOM from 'react-dom';
import renderer from '../../../src/renderer/renderer.jsx';

it ('renders', () => {
  const element = new Object;
  const document = { getElementById: jest.fn().mockReturnValue(element) }
  ReactDOM.render = jest.fn();
  React.createElement = jest.fn();
  renderer.render({}, document)
  expect(ReactDOM.render).toHaveBeenCalled();
});
