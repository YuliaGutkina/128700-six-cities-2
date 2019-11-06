import React from "react";
import renderer from "react-test-renderer";
import {CityMap} from "./city-map";
import {offers} from "../../mocks/offers";

it(`Map correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<CityMap
      items={offers}
      initialCity={[52.38333, 4.9]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
