import React from "react";
import renderer from "react-test-renderer";
import {OffersList} from "./offers-list";
import {offers} from "../../mocks/offers";

it(`Offers list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <OffersList
          offers={offers}
          onCardTitleClick={jest.fn()}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
