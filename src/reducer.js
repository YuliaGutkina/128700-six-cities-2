const receiveCityOffersSelector = (state) => {
  const currentCity = state.city;

  return state.offers.filter((offer) => (offer.city.name === currentCity));
};

const receiveCitiesListSelector = (state) => {
  const offers = state.offers;

  return Array.from(new Set(offers.map((offer) => offer.city.name)))
    .map((cityName) => ({
      name: cityName,
      location: offers.find((item) => item.city.name === cityName).city.location
    }));
};

const receiveCityInfoSelector = (state) => {
  const [currentCity] = receiveCitiesListSelector(state).filter((city) => city.name === state.city);
  return currentCity;
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: `CHANGE_CITY`,
    payload: newCity
  }),
  requireAuthorization: (status) => ({
    type: `REQUIRE_AUTHORIZATION`,
    payload: status,
  }),
  loadOffers: (offers) => ({
    type: `LOAD_OFFERS`,
    payload: offers
  })
};

const initialState = {
  city: `Amsterdam`,
  offers: [],
  isAuthorizationRequired: false
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload
    });
    case `REQUIRE_AUTHORIZATION`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload
    });
    case `LOAD_OFFERS`: return Object.assign({}, state, {
      offers: action.payload
    });
  }

  return state;
};

export {
  ActionCreator,
  Operation,
  reducer,
  receiveCityOffersSelector,
  receiveCitiesListSelector,
  receiveCityInfoSelector
};
