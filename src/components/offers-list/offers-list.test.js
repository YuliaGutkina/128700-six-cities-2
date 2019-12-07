import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {OffersList} from "./offers-list";
import {offersData} from "../../mocks/offer-data";


it(`Offers list correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <OffersList
        places={offersData}
        onCardTitleClick={jest.fn()}
        onSetActive={jest.fn()}
      />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
