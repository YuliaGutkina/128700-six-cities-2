import ReactDOM from 'react-dom';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from "./components/app/app";
import {reducer} from "./reducer";

const init = () => {
  const onCardTitleClick = () => {};
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <App
      onCardTitleClick={onCardTitleClick}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
