import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {OfferCard} from "./offer-card";
import {offersData} from "../../mocks/offer-data";


it(`Offer card correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <OfferCard
        offer={offersData[0]}
        onHover={jest.fn()}
        onFavoriteClick={jest.fn}
        imageWidth={10}
        imageHeight={10}
      />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
