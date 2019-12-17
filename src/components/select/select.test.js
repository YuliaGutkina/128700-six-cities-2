import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {Select} from "./select";


it(`Select correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <Select
        onChange={jest.fn}
        value={`popular`}
        options={[{value: `1`, text: `fake1`}, {value: `2`, text: `fake2`}]}
        id="0"
        className="test"
        optionClassName="test-option"
      />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
