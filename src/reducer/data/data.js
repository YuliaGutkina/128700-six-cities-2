const initialState = {
  city: `Amsterdam`,
  offers: []
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  })
};

const transformApiOffers = (apiOffers) => {
  return apiOffers.map((offer) => ({
    id: offer.id,
    city: {
      name: offer.city.name,
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom
      }
    },
    preview: offer[`preview_image`],
    images: offer.images,
    title: offer.title,
    isFavorite: offer[`is_favorite`],
    isPremium: offer[`is_premium`],
    rating: offer.rating,
    type: offer.type,
    bedrooms: offer.bedrooms,
    maxAdults: offer[`max_adults`],
    price: offer.price,
    goods: offer.goods,
    host: {
      id: offer.host.id,
      isPro: offer.host[`is_pro`],
      name: offer.host.name,
      avatar: offer.host[`avatar_url`]
    },
    description: offer.description,
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom
    }
  }));
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(transformApiOffers(response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY: return Object.assign({}, state, {
      city: action.payload
    });
    case ActionType.LOAD_OFFERS: return Object.assign({}, state, {
      offers: action.payload
    });
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
