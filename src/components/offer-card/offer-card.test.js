import React from "react";
import renderer from "react-test-renderer";
import {OfferCard} from "./offer-card";
import {offersData} from "../../mocks/offer-data";

it(`Offer card correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <OfferCard
          offer={offersData}
          onTitleClick={jest.fn()}
          onHover={jest.fn()}
          onFavoriteClick={jest.fn}
          history={{
            push: jest.fn
          }}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
