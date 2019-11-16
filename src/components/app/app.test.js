import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {App} from "./app";
import {offersData} from "../../mocks/offers-data";

it(`App correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <App
        offers={offersData}
      />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
