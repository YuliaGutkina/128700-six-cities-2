import React from "react";
import renderer from "react-test-renderer";
import {OfferCard} from "./offer-card";

it(`Offer card correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <OfferCard
          offer={{
            title: `Wood and stone place`,
            type: `Private room`,
            isPremium: false,
            src: `img/room.jpg`,
            price: 80,
            rating: 80}
          }
          onTitleClick={jest.fn()}
          onHover={jest.fn()}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
