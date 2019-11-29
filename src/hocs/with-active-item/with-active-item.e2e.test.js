import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from "./with-active-item";
import {offersData} from "../mocks/offers-data";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);
const answerHandler = jest.fn();

it(`Should change active item`, () => {
  const wrapper = shallow(<MockComponentWrapped
    places={offersData[0].places}
    onSetActive={answerHandler}
  />);

  expect(wrapper.state().activeItem).toEqual(null);
});
