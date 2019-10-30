import ReactDOM from 'react-dom';
import React from 'react';
import {App} from "./components/app/app";


const init = () => {
  const places = [
    `Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`
  ];
  const onCardTitleClick = () => {};

  ReactDOM.render(
      <App
        places={places}
        onTitleClick={onCardTitleClick}
      />,
      document.querySelector(`#root`)
  );
};

init();
