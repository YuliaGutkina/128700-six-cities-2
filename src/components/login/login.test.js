import React from "react";
import ShallowRenderer from 'react-test-renderer/shallow';
import {Login} from "./login";
import {offersData} from "../../mocks/offer-data";


it(`Login correctly renders after relaunch`, () => {
  const renderer = new ShallowRenderer();
  renderer.render(
      <Login
        onFormSubmit={jest.fn()}
        onInputChange={jest.fn()}
        city={offersData[0].city}
      />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
