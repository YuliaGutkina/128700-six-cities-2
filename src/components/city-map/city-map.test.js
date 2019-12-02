import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import {CityMap} from "./city-map";


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
        items={[{
          city: {
            name: `Amsterdam`,
            location: {
              latitude: 0,
              longitude: 0,
              zoom: 0
            }
          },
        }, {
          city: {
            name: `Amsterdam`,
            location: {
              latitude: 0,
              longitude: 0,
              zoom: 0
            }
          },
        }]}
        currentCity={{
          name: `Amsterdam`,
          location: {
            latitude: 0,
            longitude: 0,
            zoom: 0
          }
        }}
      />,
      options
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
