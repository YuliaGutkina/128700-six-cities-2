import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {Sorting} from "./sorting";


it(`Sorting correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <Sorting
        sortingOrder="to-high"
        onChangeSorting={jest.fn()}
      />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
