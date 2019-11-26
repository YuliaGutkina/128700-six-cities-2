// import {createSelector} from "reselect";
import NameSpace from "../name-spaces";


const NAME_SPACE = NameSpace.DATA;

const receiveCityOffersSelector = (state) => {
  const currentCity = state[NAME_SPACE].city;

  return state[NAME_SPACE].offers.filter((offer) => (offer.city.name === currentCity));
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


export {
  receiveCityInfoSelector,
  receiveCityOffersSelector,
  receiveCitiesListSelector,
};
