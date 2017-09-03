// @flow
import { createStore } from 'redux';
import renderer from './renderer.jsx'

require('./stylesheet.css');
const defaultCode = require("./initial-code-state.yml");

const defaultState = { stageful: defaultCode }
const reducer = (state = defaultState) => state;
const store = createStore(reducer);
const entry = () => {
  if (document.readyState !== 'complete') { throw (new Error('readyState error')); }
  renderer.render(store);
};

window.addEventListener('load', () => { entry(); });
