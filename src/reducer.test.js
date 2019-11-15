import {ActionCreator, reducer} from "./reducer";
import {offers} from "./mocks/offers";

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: offers[0].city,
      places: offers[0].places
    });
  });

  it(`Reducer should change city to given value`, () => {
    expect(reducer({
      city: offers[0].city,
      places: offers[0].places
    }, {
      type: `CHANGE_CITY`,
      payload: {
        name: `Paris`,
        coordinates: [54.38333, 4.69]
      }
    })).toEqual({
      city: {
        name: `Paris`,
        coordinates: [54.38333, 4.69]
      },
      places: offers[0].places
    });
  });

  it(`Reducer should receive new offers from given value`, () => {
    expect(reducer({
      city: offers[0].city,
      places: offers[0].places
    }, {
      type: `RECEIVE_OFFERS`,
      payload: [{a: `abc`}, {b: `cde`}]
    })).toEqual({
      city: offers[0].city,
      places: [{a: `abc`}, {b: `cde`}]
    });
  });
});

describe(`Action Creators work correctly`, () => {
  it(`Action Creator for changing city returns correct action`, () => {
    expect(ActionCreator.changeCity({
      name: `Paris`,
      coordinates: [54.38333, 4.69]
    })).toEqual({
      type: `CHANGE_CITY`,
      payload: {
        name: `Paris`,
        coordinates: [54.38333, 4.69]
      }
    });
  });

  it(`Action Creator for receiving offers returns correct action`, () => {
    expect(ActionCreator.receiveOffers([{a: `abc`}])).toEqual({
      type: `RECEIVE_OFFERS`,
      payload: [{a: `abc`}]
    });
  });
});
