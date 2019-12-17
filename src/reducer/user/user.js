const initialState = {
  userData: null
};

const ActionType = {
  AUTHORIZE_USER: `AUTHORIZE_USER`
};

const ActionCreator = {
  authorizeUser: (userInfo) => ({
    type: ActionType.AUTHORIZE_USER,
    payload: userInfo
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
      return api.post(`/login`, {email, password})
        .then((response) => {
          dispatch(ActionCreator.authorizeUser(transformApiUser(response.data, api.defaults.baseURL)));
        });
    }
  },
  echoUser: () => {
    return (dispatch, getState, api) => {
      return api.get(`/login`)
        .then((response) => {
          dispatch(ActionCreator.authorizeUser(transformApiUser(response.data, api.defaults.baseURL)));
        })
        .catch(() => {
          // dispatch(ActionCreator.logout());
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
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  Operation,
  reducer
};
