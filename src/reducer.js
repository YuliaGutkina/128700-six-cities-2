import {offersData} from "./mocks/offers-data";


const receiveCityOffers = (city) => {
  const cityData = offersData.filter((offer) => (offer.city === city))[0];

  return cityData.places;
};

const receiveCityCoordinates = (city) => {
  const cityData = offersData.filter((offer) => (offer.city === city))[0];

  return cityData.initialCoordinates;
};

const receiveCityOffersSelector = (state) => {
  return receiveCityOffers(state.city);
};

const receiveCityCoordinatesSelector = (state) => {
  return receiveCityCoordinates(state.city);
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity
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
  }

  return state;
};

export {
  ActionCreator,
  reducer,
  receiveCityOffersSelector,
  receiveCityCoordinatesSelector
};
