import {ActionCreator, receiveCityCoordinatesSelector, receiveCityOffersSelector, reducer} from "./reducer";
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
});

describe(`Action Creators work correctly`, () => {
  it(`Action Creator for changing city returns correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Paris`
    });
  });
});

describe(`Selectors work correctly`, () => {
  it(`Selector for receiving offers returns correct value`, () => {
    expect(receiveCityOffersSelector({
      city: offersData[0].city,
      offers: {}
    })).toEqual(offersData[0].places);
  });

  it(`Selector for receiving coordinates returns correct value`, () => {
    expect(receiveCityCoordinatesSelector({
      city: offersData[0].city,
      offers: {}
    })).toEqual(offersData[0].initialCoordinates);
  });
});
