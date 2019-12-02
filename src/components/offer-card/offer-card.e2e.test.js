import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {OfferCard} from "./offer-card";

Enzyme.configure({adapter: new Adapter()});

it(`Click on title works correctly`, () => {
  const clickHandler = jest.fn();
  const card = shallow(<OfferCard
    offer={{
      title: `Wood and stone place`,
      type: `Private room`,
      isPremium: false,
      src: `img/room.jpg`,
      price: 80,
      rating: 80
    }}
    onTitleClick={clickHandler}
    onHover={jest.fn()}
  />);

  const title = card.find(`.place-card__name a`);
  title.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it(`Hover on card return correct data`, () => {
  const hoverHandler = jest.fn();

  const card = shallow(<OfferCard
    offer={{
      title: `Wood and stone place`,
      type: `Private room`,
      isPremium: false,
      src: `img/room.jpg`,
      price: 80,
      rating: 80
    }}
    onTitleClick={jest.fn()}
    onHover={hoverHandler}
  />);

  card.simulate(`mouseenter`);

  expect(hoverHandler).toHaveBeenCalledWith({
    title: `Wood and stone place`,
    type: `Private room`,
    isPremium: false,
    src: `img/room.jpg`,
    price: 80,
    rating: 80
  });
});
