import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from "./components/app/app";
import {reducer} from "./reducer";
import {offers} from "./mocks/offers";

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <App offers={offers}/>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
