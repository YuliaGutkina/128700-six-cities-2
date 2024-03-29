import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {Favorites} from "./favorites";
import {offersData} from "../../mocks/offer-data";


it(`Favorites page correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer
    .render(
        <Favorites
          favorite={[{city: offersData[0].city.name, offers: [offersData[0]]}]}
          onLoadFavorite={jest.fn()}
        />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
