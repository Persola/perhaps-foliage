// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader.js'
import renderer from './renderer.jsx'

require('./stylesheet.css');

const defaultState = { stageful: codeLoader.default() };
const reducer = (state = defaultState) => state;
const store = createStore(reducer);
const entry = () => {
  if (document.readyState !== 'complete') { throw (new Error('readyState error')); }
  renderer.render(store);
};

window.addEventListener('load', () => { entry(); });
