// import {createSelector} from "reselect";
import NameSpace from "../name-spaces";


const NAME_SPACE = NameSpace.DATA;

const receiveCityOffersSelector = (state) => {
  const currentCity = state[NAME_SPACE].city;

  return state[NAME_SPACE].offers.filter((offer) => (offer.city.name === currentCity));
};

const receiveCityOffersSortedSelector = (state) => {
  const sortingOrder = state[NAME_SPACE].sortingOrder;
  const cityOffers = receiveCityOffersSelector(state);

  switch (sortingOrder) {
    case `to-high`: return cityOffers.sort((a, b) => a.price - b.price);
    case `to-low`: return cityOffers.sort((a, b) => b.price - a.price);
    case `top-rated`: return cityOffers.sort((a, b) => a.rating - b.rating);
  }

  return cityOffers;
};

const receiveCitiesListSelector = (state) => {
  const offers = state[NAME_SPACE].offers;

  return Array.from(new Set(offers.map((offer) => offer.city.name)))
    .map((cityName) => ({
      name: cityName,
      location: offers.find((item) => item.city.name === cityName).city.location
    }));
};

const receiveCityInfoSelector = (state) => {
  const [currentCity] = receiveCitiesListSelector(state).filter((city) => city.name === state[NAME_SPACE].city);

  return currentCity;
};

const receiveFavoriteSelector = (state) => {
  const favorite = state[NAME_SPACE].favorite;
  const cities = Array.from(new Set(favorite.map((offer) => offer.city.name)));

  return cities.map((cityName) => ({
    city: cityName,
    offers: favorite.filter((item) => item.city.name === cityName)
  }));
};

const receiveOfferSelector = (state, id) => {
  return state[NAME_SPACE].offers.find((item) => item.id === id);
};

const getActiveOfferSelector = (state) => state[NAME_SPACE].activeOffer;

const getSortingOrder = (state) => state[NAME_SPACE].sortingOrder;


export {
  receiveCityInfoSelector,
  receiveCityOffersSelector,
  receiveCityOffersSortedSelector,
  receiveCitiesListSelector,
  receiveFavoriteSelector,
  receiveOfferSelector
  receiveFavoriteSelector,
  getActiveOfferSelector,
  getSortingOrder
};
