import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from "react-redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {getAllProducts} from './actions'

import reducer from './reducers'
import App from './containers/App';
import './css/index.css';


const composeEnhancers = composeWithDevTools({})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getAllProducts())

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
)


