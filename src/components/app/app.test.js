import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {App} from "./app";


it(`App correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <App/>
  );

  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
