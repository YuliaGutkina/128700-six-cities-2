import React from "react";
import renderer from "react-test-renderer";

import {App} from "./app";
import {offersData} from "../../mocks/offers-data";

it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <App
          offers={offersData}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
