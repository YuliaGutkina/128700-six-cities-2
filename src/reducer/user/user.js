import {NotificationManager} from "react-notifications";

const initialState = {
  userData: null,
  isUserDataFetching: true
};

const ActionType = {
  AUTHORIZE_USER: `AUTHORIZE_USER`,
  SET_USER_IS_FETCHING: `SET_USER_IS_FETCHING`,
  NEED_LOGOUT: `NEED_LOGOUT`
};

const ActionCreator = {
  authorizeUser: (userInfo) => ({
    type: ActionType.AUTHORIZE_USER,
    payload: userInfo
  }),
  setUserIsFetching: (isFetching) => ({
    type: ActionType.SET_USER_IS_FETCHING,
    payload: isFetching
  }),
  needLogout: (isLogoutNeeded) => ({
    type: ActionType.NEED_LOGOUT,
    payload: isLogoutNeeded
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
      NotificationManager.error(`No email or password`);
      return false;
    } else {
      return api.post(`/login`, {email, password})
        .then((response) => {
          dispatch(ActionCreator.authorizeUser(transformApiUser(response.data, api.defaults.baseURL)));
        })
        .catch((e) => {
          NotificationManager.error(e.message);
        });
    }
  },
  echoUser: () => {
    return (dispatch, getState, api) => {
      return api.get(`/login`)
        .then((response) => {
          dispatch(ActionCreator.authorizeUser(transformApiUser(response.data, api.defaults.baseURL)));
        })
        .catch(() => {})
        .then(() => {
          dispatch(ActionCreator.setUserIsFetching(false));
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
    case ActionType.NEED_LOGOUT:
      return Object.assign({}, state, {
        needLogout: action.payload,
        userData: null
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
