import React from "react";
import renderer from "react-test-renderer";
import {MainPage} from "./main-page";
import {offersData} from "../../mocks/offers-data";

it(`Main page correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <MainPage
          offersData={offersData}
          city="Amsterdam"
          cityOffers={{
            city: `Amsterdam`,
            coordinates: [0, 0],
            places: [{}, {}]
          }}
          onCardTitleClick={jest.fn()}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
