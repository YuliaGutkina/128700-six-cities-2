const initialState = {
  userData: null
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  AUTHORIZE_USER: `AUTHORIZE_USER`
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
  authorizeUser: (userInfo) => ({
    type: ActionType.AUTHORIZE_USER,
    payload: userInfo
  })
};

const Operation = {
  requireAuthorization: ({email, password}) => (dispatch, _getState, api) => {
    if (!email || !password) {
      throw new Error(`No email or password`);
    } else {
      return api.post(`/login`, {email, password})
        .then((response) => {
          dispatch(ActionCreator.authorizeUser(response.data));
        });
    }
  },
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
