// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CodeStageContainer from './components/code-stage.jsx';

export default {
  render: (store: Object) => {
    const rootEl = document.getElementById('code-stage');

    ReactDOM.render(
      (
        <Provider store={store}>
          <CodeStageContainer />
        </Provider>
      ),
      rootEl,
    );
  }
}
