// @ts-nocheck
import { TestRedux } from "./components/test-redux";
import { createStore, applyMiddleware } from "./mini-redux/custom-redux";
import { counterReducer } from "./reducer/index";
import { Provider } from "./mini-redux/custom-react-redux";
import thunk from "./mini-redux/custom-redux-thunk";
import arrayThunk from "./mini-redux/custom-redux-array";

let store = createStore(counterReducer, applyMiddleware(thunk, arrayThunk));

export const SimpleRedux = () => {
  return (
    <div>
      <Provider store={store}>
        <TestRedux></TestRedux>
      </Provider>
    </div>
  );
};


export default SimpleRedux
