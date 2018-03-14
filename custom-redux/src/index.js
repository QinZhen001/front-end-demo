import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from './custom-redux'
import arrThunk from './custom-redux-array'
import thunk from  './custom-redux-thunk'
import {counter} from './reducer'
import {Provider} from './custom-react-redux'
import App from './App';

// import Page from './test/context-demo'

// import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(counter, applyMiddleware(thunk, arrThunk))


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(<Page />, document.getElementById('root'));