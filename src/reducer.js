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
  city: offers[0].city,
  places: offers[0].places
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload
    });
    case `RECEIVE_OFFERS`: return Object.assign({}, state, {
      places: action.payload
    });
  }

  return state;
};

export {
  ActionCreator,
  reducer
};
