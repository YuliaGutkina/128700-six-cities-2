import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {compose} from "recompose";
import {BrowserRouter as Router} from "react-router-dom";

import {App} from "./components/app/app";
import reducer from "./reducer";
import {createAPI} from "./api";
import {Operation} from "./reducer/data/data";


const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadOffers());

  ReactDOM.render(<Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
