import React from 'react'
import ReactDOM from 'react-dom'
import AppLayout from 'layouts/App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { reducers } from 'state'



/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
      store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
/* eslint-enable */

ReactDOM.render(
    <Provider store={store}>
        <AppLayout />
    </Provider>,
    document.getElementById('app')
)
