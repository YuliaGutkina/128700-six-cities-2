import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from "./with-active-item";


Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should change active item`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);

  wrapper.find(MockComponent).simulate(`setActive`, {fake: true});

  expect(wrapper.find(MockComponent).prop(`activeItem`)).toEqual({fake: true});
});
