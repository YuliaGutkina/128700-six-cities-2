import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import {ReviewsList} from "./reviews-list";
import {commentsData} from "../../mocks/comments-data";


it(`Offers list correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <ReviewsList comments={commentsData}/>
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
