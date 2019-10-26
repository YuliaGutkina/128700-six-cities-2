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

  ReactDOM.render(
      <App
        places={places}
      />,
      document.querySelector(`#root`)
  );
};

init();
