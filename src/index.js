import ReactDOM from 'react-dom';
import React from 'react';
import {App} from "./components/app/app";
import {offers} from "./mocks/offers";

const init = () => {

  const onCardTitleClick = () => {};

  ReactDOM.render(
      <App
        offers={offers}
        onCardTitleClick={onCardTitleClick}
      />,
      document.querySelector(`#root`)
  );
};

init();
