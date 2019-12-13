import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {offersData} from "../../mocks/offer-data";
import {Bookmark} from "./bookmark";


it(`Bookmark correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <Bookmark
        offer={offersData[0]}
        onFavoriteClick={jest.fn()}
        userData={{fake: true}}
        history={{push: jest.fn}}
        isFavorite={true}
      />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
