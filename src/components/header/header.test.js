import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {Header} from "./header";


it(`Favorites page correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer
    .render(
        <Header userData={{}}/>);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});

