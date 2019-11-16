import React from "react";
import renderer from "react-test-renderer";
import {CityMap} from "./city-map";
import {offersData} from "../../mocks/offers-data";

function createNodeMock(element) {
  if (element.type === `section`) {
    return {
      focus() {},
    };
  }
  return null;
}

it(`Map correctly renders after relaunch`, () => {
  const options = {createNodeMock};
  const tree = renderer
    .create(<CityMap
      items={offersData}
      initialCity={{
        name: `Amsterdam`,
        coordinates: [52.38333, 4.9]
      }}
    />, options)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
