import React from 'react'
import ReactDOM from 'react-dom'
import Redux from 'redux'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import ReactRedux from 'react-redux'

import CodeStageContainer from './components/code-stage.js'

require('./stylesheet.css')

console.log('CRUMBLECANO!')

const defaultState = {
  code: {
    klass: 'numberLiteral',
    data: 1
  }
}

const reducer = (state = defaultState, action) => state

const store = createStore(reducer);

const entry = function() {
  var rootEl = document.getElementById('code-stage')
  if(document.readyState !== 'complete') { throw('readyState error') }

  ReactDOM.render(
    (
      <Provider store={store}>
        <CodeStageContainer />
	  </Provider>
	),
	rootEl
  )
}

window.addEventListener('load', function(event) {
  entry()
})

