import {offers} from "./mocks/offers";


const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity
  }),
  receiveOffers: (newOffers) => ({
    type: `RECEIVE_OFFERS`,
    payload: newOffers
  })
};

const initialState = {
  city: {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9]
  },
  offers
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload
    });
    case `RECEIVE_OFFERS`: return Object.assign({}, state, {
      offers: action.payload
    });
  }

  return state;
};

export {
  ActionCreator,
  reducer
};
