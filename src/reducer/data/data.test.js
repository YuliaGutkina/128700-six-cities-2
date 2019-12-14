import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";

import {ActionCreator, ActionType, Operation, reducer} from "./data";


describe(`Reducers work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{
        id: 1,
        city: {
          name: `Amsterdam`,
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10
          }
        },
        [`preview_image`]: `img/1.png`,
        images: [`img/1.png`, `img/2.png`],
        title: `Beautiful & luxurious studio at great location`,
        [`is_favorite`]: false,
        [`is_premium`]: false,
        rating: 4.8,
        type: `apartment`,
        bedrooms: 3,
        [`max_adults`]: 4,
        price: 120,
        goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        host: {
          id: 3,
          [`is_pro`]: true,
          name: `Angelina`,
          [`avatar_url`]: `img/1.png`
        },
        description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8
        }
      }]);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{
            id: 1,
            city: {
              name: `Amsterdam`,
              location: {
                latitude: 52.370216,
                longitude: 4.895168,
                zoom: 10
              }
            },
            preview: `img/1.png`,
            images: [`img/1.png`, `img/2.png`],
            title: `Beautiful & luxurious studio at great location`,
            isFavorite: false,
            isPremium: false,
            rating: 4.8,
            type: `apartment`,
            bedrooms: 3,
            maxAdults: 4,
            price: 120,
            goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
            host: {
              id: 3,
              isPro: true,
              name: `Angelina`,
              avatar: `img/1.png`
            },
            description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
            location: {
              latitude: 52.35514938496378,
              longitude: 4.673877537499948,
              zoom: 8
            }
          }],
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadFavorite();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{
        id: 1,
        city: {
          name: `Amsterdam`,
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10
          }
        },
        [`preview_image`]: `img/1.png`,
        images: [`img/1.png`, `img/2.png`],
        title: `Beautiful & luxurious studio at great location`,
        [`is_favorite`]: false,
        [`is_premium`]: false,
        rating: 4.8,
        type: `apartment`,
        bedrooms: 3,
        [`max_adults`]: 4,
        price: 120,
        goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        host: {
          id: 3,
          [`is_pro`]: true,
          name: `Angelina`,
          [`avatar_url`]: `img/1.png`
        },
        description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8
        }
      }]);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE,
          payload: [{
            id: 1,
            city: {
              name: `Amsterdam`,
              location: {
                latitude: 52.370216,
                longitude: 4.895168,
                zoom: 10
              }
            },
            preview: `img/1.png`,
            images: [`img/1.png`, `img/2.png`],
            title: `Beautiful & luxurious studio at great location`,
            isFavorite: false,
            isPremium: false,
            rating: 4.8,
            type: `apartment`,
            bedrooms: 3,
            maxAdults: 4,
            price: 120,
            goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
            host: {
              id: 3,
              isPro: true,
              name: `Angelina`,
              avatar: `img/1.png`
            },
            description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
            location: {
              latitude: 52.35514938496378,
              longitude: 4.673877537499948,
              zoom: 8
            }
          }],
        });
      });
  });

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: `Amsterdam`,
      offers: [],
      favorite: [],
      sortingOrder: `popular`,
      comments: {}
    });
  });

  it(`Reducer should change city to given value`, () => {
    expect(reducer({
      city: `Amsterdam`,
      offers: [{a: `abc`}]
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`
    })).toEqual({
      city: `Paris`,
      offers: [{a: `abc`}]
    });
  });
});

describe(`Action Creators work correctly`, () => {
  it(`Action Creator for changing city returns correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Paris`
    });
  });
});
