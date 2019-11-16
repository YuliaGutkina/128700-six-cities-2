import {offersData} from "./mocks/offers-data";


const receiveCityOffers = (city) => {
  return offersData.filter((offer) => (offer.city === city))[0];
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity
  }),
  receiveOffers: (city) => ({
    type: `RECEIVE_OFFERS`,
    payload: receiveCityOffers(city)
  })
};

const initialState = {
  city: offersData[0].city,
  offers: offersData[0]
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
