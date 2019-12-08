import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';

import {MainPage} from "./main-page";


it(`Main page correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <MainPage
        city={{
          name: `Amsterdam`
        }}
        citiesList={[]}
        cityOffers={[{}, {}]}
      />
  );
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
