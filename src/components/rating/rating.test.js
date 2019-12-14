import React from "react";
import renderer from "react-test-renderer";
import {Rating} from "./rating";


it(`Rating correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <Rating value={3.2}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
