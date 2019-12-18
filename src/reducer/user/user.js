const initialState = {
  userData: null,
  isUserDataFetching: false
};

const ActionType = {
  AUTHORIZE_USER: `AUTHORIZE_USER`,
  SET_USER_IS_FETCHING: `SET_USER_IS_FETCHING`
};

const ActionCreator = {
  authorizeUser: (userInfo) => ({
    type: ActionType.AUTHORIZE_USER,
    payload: userInfo
  }),
  setUserIsFetching: (isFetching) => ({
    type: ActionType.SET_USER_IS_FETCHING,
    payload: isFetching
  })
};

const transformApiUser = (apiUser, baseUrl) => {
  return {
    id: apiUser.id,
    email: apiUser.email,
    name: apiUser.name,
    avatar: baseUrl + apiUser[`avatar_url`],
    isPro: apiUser[`is_pro`]
  };
};

const Operation = {
  authorizeUser: ({email, password}) => (dispatch, _getState, api) => {
    if (!email || !password) {
      throw new Error(`No email or password`);
    } else {
      dispatch(ActionCreator.setUserIsFetching(true));

      return api.post(`/login`, {email, password})
        .then((response) => {
          dispatch(ActionCreator.authorizeUser(transformApiUser(response.data, api.defaults.baseURL)));
          dispatch(ActionCreator.setUserIsFetching(false));
        });
    }
  },
  echoUser: () => {
    return (dispatch, getState, api) => {
      return api.get(`/login`)
        .then((response) => {
          dispatch(ActionCreator.authorizeUser(transformApiUser(response.data, api.defaults.baseURL)));
        });
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZE_USER:
      return Object.assign({}, state, {
        userData: action.payload
      });
    case ActionType.SET_USER_IS_FETCHING:
      return Object.assign({}, state, {
        isUserDataFetching: action.payload
      });
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer
};
