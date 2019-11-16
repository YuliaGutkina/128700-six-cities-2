import React from "react";
import renderer from "react-test-renderer";

import {offersData} from "../../mocks/offers-data";
import {Locations} from "./locations";

it(`Offers list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Locations
          offers={offersData}
          currentCity="Paris"
          onTabClick={jest.fn()}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
