import {ActionCreator, reducer} from "./reducer";
import {offers} from "./mocks/offers";

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters shoul return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: {
        name: `Amsterdam`,
        coordinates: [52.38333, 4.9]
      },
      offers
    });
  });

  it(`Reducer should change city to given value`, () => {
    expect(reducer({
      city: {
        name: `Amsterdam`,
        coordinates: [52.38333, 4.9]
      },
      offers
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
      offers
    });
  });

  it(`Reducer should receive new offers from given value`, () => {
    expect(reducer({
      city: {
        name: `Amsterdam`,
        coordinates: [52.38333, 4.9]
      },
      offers
    }, {
      type: `RECEIVE_OFFERS`,
      payload: [{a: `abc`}, {b: `cde`}]
    })).toEqual({
      city: {
        name: `Amsterdam`,
        coordinates: [52.38333, 4.9]
      },
      offers: [{a: `abc`}, {b: `cde`}]
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
