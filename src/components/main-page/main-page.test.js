import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {MainPage} from "./main-page";
import {offersData} from "../../mocks/offers-data";

it(`Main page correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <MainPage
        offersData={offersData}
        city="Amsterdam"
        cityOffers={{
          city: `Amsterdam`,
          coordinates: [0, 0],
          places: [{}, {}]
        }}
        onCardTitleClick={jest.fn()}
      />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
