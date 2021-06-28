import * as React from 'react';
import ReactDOM from 'react-dom';
import Renderer from '../../../src/renderer/renderer.jsx';

it ('renders', () => {
  const element = new Object;
  const document = { getElementById: jest.fn().mockReturnValue(element) }
  ReactDOM.render = jest.fn();
  React.createElement = jest.fn();
  const renderer = new Renderer(document)
  renderer.render({})
  expect(ReactDOM.render).toHaveBeenCalled();
});
