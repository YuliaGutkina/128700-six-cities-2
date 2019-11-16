import {ActionCreator, reducer} from "./reducer";
import {offersData} from "./mocks/offers-data";


describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: offersData[0].city,
      offers: offersData[0]
    });
  });

  it(`Reducer should change city to given value`, () => {
    expect(reducer({
      city: offersData[0].city,
      offers: offersData[0]
    }, {
      type: `CHANGE_CITY`,
      payload: offersData[1].city
    })).toEqual({
      city: offersData[1].city,
      offers: offersData[0]
    });
  });

  it(`Reducer should receive new offers from given value`, () => {
    expect(reducer({
      city: offersData[0].city,
      offers: offersData[0]
    }, {
      type: `RECEIVE_OFFERS`,
      payload: offersData[1]
    })).toEqual({
      city: offersData[0].city,
      offers: offersData[1]
    });
  });
});

describe(`Action Creators work correctly`, () => {
  it(`Action Creator for changing city returns correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Paris`
    });
  });

  it(`Action Creator for receiving offers returns correct action`, () => {
    expect(ActionCreator.receiveOffers(offersData[1].city)).toEqual({
      type: `RECEIVE_OFFERS`,
      payload: offersData[1]
    });
  });
});
