import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from "./app";

Enzyme.configure({adapter: new Adapter()});

it(`Click on title works correctly`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<App
    places={[`Wood and stone place`]}
    onTitleClick={clickHandler}
  />);

  const title = app.find(`.place-card__name a`);
  title.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
