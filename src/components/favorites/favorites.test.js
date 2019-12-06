import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {Favorites} from "./favorites";


it(`Favorites page correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer
    .render(
        <Favorites/>);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
