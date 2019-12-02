import React from "react";
import renderer from "react-test-renderer";
import {OffersList} from "./offers-list";


it(`Offers list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <OffersList
          places={[{}, {}]}
          onCardTitleClick={jest.fn()}
          onSetActive={jest.fn()}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
