import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {compose} from "recompose";
import {BrowserRouter as Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {NotificationContainer} from "react-notifications";

import App from "./components/app/app";
import reducer from "./reducer/reducer";
import {createAPI} from "./api";
import {Operation} from "./reducer/data/data";


const history = createBrowserHistory();

const init = () => {
  const api = createAPI();
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadOffers());

  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
    <NotificationContainer/>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
