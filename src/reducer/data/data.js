const initialState = {
  city: `Amsterdam`,
  offers: [],
  favorite: [],
  sortingOrder: `popular`,
  comments: {},
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
  TOGGLE_FAVORITE_STATUS: `TOGGLE_FAVORITE_STATUS`,
  ADD_TO_FAVORITES: `ADD_TO_FAVORITES`,
  REMOVE_FROM_FAVORITES: `REMOVE_FROM_FAVORITES`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  CHANGE_SORTING: `CHANGE_SORTING`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
};

const ActionCreator = {
  changeCity: (newCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: newCity
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers
  }),
  loadFavorite: (favorite) => ({
    type: ActionType.LOAD_FAVORITE,
    payload: favorite
  }),
  toggleFavoriteStatus: (offer) => {
    offer.isFavorite = !offer.isFavorite;

    return {
      type: ActionType.TOGGLE_FAVORITE_STATUS,
      payload: offer
    };
  },
  addToFavorites: (offer) => ({
    type: ActionType.ADD_TO_FAVORITES,
    payload: offer
  }),
  removeFromFavorites: (offer) => ({
    type: ActionType.REMOVE_FROM_FAVORITES,
    payload: offer.id
  }),
  setActiveOffer: (offer) => ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: offer
  }),
  changeSorting: (sortBy) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sortBy
  }),
  loadComments: (id, comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: {id, comments}
  })
};

const transformApiOffer = (offer) => ({
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
});

const transformApiOffers = (apiOffers) => {
  return apiOffers.map((offer) => transformApiOffer(offer));
};

const transformApiComments = (apiComments) => {
  return apiComments.map((comment) => ({
    id: comment.id,
    user: {
      id: comment.user.id,
      isPro: comment.user[`is_pro`],
      name: comment.user.name,
      avatar: comment.user[`avatar_url`]
    },
    rating: comment.rating,
    comment: comment.comment,
    date: comment.date
  }));
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(transformApiOffers(response.data)));
      });
  },
  loadFavorite: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorite(transformApiOffers(response.data)));
      });
  },
  toggleFavoriteStatus: (offer) => (dispatch, _getState, api) => {
    const hotelId = offer.id;
    const status = offer.isFavorite ? 0 : 1;

    return api.post(`/favorite/${hotelId}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.toggleFavoriteStatus(offer));

        if (status === 1) {
          dispatch(ActionCreator.addToFavorites(transformApiOffer(response.data)));
        } else {
          dispatch(ActionCreator.removeFromFavorites(transformApiOffer(response.data)));
        }
      });
  },
  loadComments: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(offerId, transformApiComments(response.data)));
      });
  },
  sendReview: (offerId, values) => (dispatch, _getState, api) => {
    return api.post(`/comments/${offerId}`, values)
      .then((response) => {
        dispatch(ActionCreator.loadComments(offerId, transformApiComments(response.data)));
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
    case ActionType.LOAD_FAVORITE: return Object.assign({}, state, {
      favorite: action.payload
    });
    case ActionType.ADD_TO_FAVORITES: return Object.assign({}, state, {
      favorite: [...state.favorite, action.payload]
    });
    case ActionType.REMOVE_FROM_FAVORITES: return Object.assign({}, state, {
      favorite: state.favorite.filter((offer) => offer.id !== action.payload)
    });
    case ActionType.TOGGLE_FAVORITE_STATUS: return Object.assign({}, state, {
      offers: [...state.offers.map((offer) => (offer.id === action.payload.id) ? action.payload : offer)]
    });
    case ActionType.SET_ACTIVE_OFFER: return Object.assign({}, state, {
      activeOffer: action.payload
    });
    case ActionType.CHANGE_SORTING: return Object.assign({}, state, {
      sortingOrder: action.payload
    });
    case ActionType.LOAD_COMMENTS: return Object.assign({}, state, {
      comments: Object.assign({}, state.comments, {
        [action.payload.id]: action.payload.comments
      })
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
