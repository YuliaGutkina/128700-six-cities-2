import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Link} from "react-router-dom";

import {OfferCard} from "./offer-card";
import {offersData} from "../../mocks/offer-data";

Enzyme.configure({adapter: new Adapter()});

it(`Includes link to offer page`, () => {
  const card = shallow(<OfferCard
    offer={offersData[0]}
    onHover={jest.fn()}
    onFavoriteClick={jest.fn()}
  />);

  expect(card.find(Link).first().props().to).toBe(`/offer/${offersData[0].id}`);
});

it(`Hover on card return correct data`, () => {
  const hoverHandler = jest.fn();

  const card = shallow(
      <OfferCard
        offer={offersData[0]}
        onHover={hoverHandler}
        onFavoriteClick={jest.fn}
      />);

  card.simulate(`mouseenter`);

  expect(hoverHandler).toHaveBeenCalledWith(offersData[0]);
});
