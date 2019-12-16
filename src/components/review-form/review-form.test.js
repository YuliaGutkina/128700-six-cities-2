import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {ReviewForm} from "./review-form";


it(`Login correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ReviewForm
    onFormSubmit={jest.fn()}
    onInputChange={jest.fn()}
    offerId={0}
    ratingValue={`1`}
    commentValue={``}
    isDisabled={true}
  />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
