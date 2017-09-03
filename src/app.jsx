// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import CodeStageContainer from './components/code-stage.jsx';

require('./stylesheet.css');

const defaultState = {
  stageful: {
    klass: 'numberLiteral',
    data: 1,
  },
};

const reducer = (state = defaultState) => state;

const store = createStore(reducer);

const entry = () => {
  const rootEl = document.getElementById('code-stage');
  if (document.readyState !== 'complete') { throw (new Error('readyState error')); }

  ReactDOM.render(
    (
      <Provider store={store}>
        <CodeStageContainer />
      </Provider>
    ),
    rootEl,
  );
};

window.addEventListener('load', () => { entry(); });
