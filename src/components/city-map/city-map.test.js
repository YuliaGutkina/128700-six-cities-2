import React from "react";
import renderer from "react-test-renderer";
import {CityMap} from "./city-map";
import {offers} from "../../mocks/offers";

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
      items={offers}
      initialCity={[52.38333, 4.9]}
    />, options)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
