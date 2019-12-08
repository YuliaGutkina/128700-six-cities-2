import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import {OfferCard} from "./offer-card";
import {offersData} from "../../mocks/offer-data";


it(`Offer card correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OfferCard
            offer={offersData[0]}
            onTitleClick={jest.fn()}
            onHover={jest.fn()}
            onFavoriteClick={jest.fn}
            history={{
              push: jest.fn
            }}
          />
        </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
