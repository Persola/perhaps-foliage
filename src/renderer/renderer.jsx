// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Editor from './components/editor.jsx';

export default {
  render: (store: Object) => {
    const rootEl = document.getElementById('editor');

    ReactDOM.render(
      (
        <Provider store={store}>
          <Editor />
        </Provider>
      ),
      rootEl,
    );
  }
}
