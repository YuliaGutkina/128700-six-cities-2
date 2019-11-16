import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from "./components/app/app";
import {reducer} from "./reducer";
import {offersData} from "./mocks/offers-data";

const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <App offersData={offersData}/>
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
