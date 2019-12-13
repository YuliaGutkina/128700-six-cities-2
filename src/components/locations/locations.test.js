import React from "react";
import renderer from "react-test-renderer";

import {Locations} from "./locations";


it(`Offers list correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Locations
          currentCity="Paris"
          citiesList={[]}
          onTabClick={jest.fn()}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
