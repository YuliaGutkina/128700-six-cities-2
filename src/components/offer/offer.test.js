import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {offersData} from "../../mocks/offer-data";
import {Offer} from "./offer";
import {commentsData} from "../../mocks/comments-data";


it(`Favorites page correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer
    .render(
        <Offer
          offerData={offersData[0]}
          nearbyOffers={[offersData[1], offersData[2]]}
          onLoadComments={jest.fn()}
          comments={commentsData}
        />
    );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
