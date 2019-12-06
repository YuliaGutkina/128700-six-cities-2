import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import {CityMap} from "./city-map";
import {offersData} from "../../mocks/offer-data";


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
  const renderer = new ShallowRenderer();
  renderer.render(
      <CityMap
        items={[offersData[0], offersData[1]]}
      />,
      options
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
