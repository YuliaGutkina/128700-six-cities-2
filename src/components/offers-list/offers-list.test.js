import React from "react";
import renderer from "react-test-renderer";
import {OffersList} from "./offers-list";
import {offersData} from "../../mocks/offers-data";

it(`Offers list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <OffersList
          places={offersData[0].places}
          onCardTitleClick={jest.fn()}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
