import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {PropertyType} from "./property-type";


it(`Favorites page correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer
    .render(
        <PropertyType type={`house`}/>);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});

