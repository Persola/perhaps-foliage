// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import EditorContainer from './components/editor.jsx';

export default {
  render: (store: Object, document: any) => {
    const rootEl = document.getElementById('editor');

    ReactDOM.render(
      (
        <Provider store={store}>
          <EditorContainer />
        </Provider>
      ),
      rootEl,
    );
  }
}
