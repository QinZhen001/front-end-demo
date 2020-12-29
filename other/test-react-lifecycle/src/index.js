import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import App from './App';
import reducer from './reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension'

import './index.css';

const test = () => {
    return {
        type: "asdasd"
    }
}

const composeEnhancers = composeWithDevTools({})
const store = createStore(reducer, composeEnhancers())

store.dispatch(test())


ReactDOM.render(<App />, document.getElementById('root'));

