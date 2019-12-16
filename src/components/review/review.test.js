import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {Review} from "./review";
import {commentsData} from "../../mocks/comments-data";


it(`Bookmark correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Review
    commentData={commentsData[0]}
  />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
