import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {App} from "./components/app/app";
import {reducer} from "./reducer";

const init = () => {
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );

  ReactDOM.render(<Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
