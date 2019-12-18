import {ActionCreator, ActionType, reducer} from "./user";


describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      userData: null,
      isUserDataFetching: true
    });
  });

  it(`Reducer should change user data to given value`, () => {
    expect(reducer({
      userData: false
    }, {
      type: ActionType.AUTHORIZE_USER,
      payload: {fake: true}
    })).toEqual({
      userData: {fake: true}
    });
  });

  it(`Reducer should change fetching state`, () => {
    expect(reducer({
      userData: {},
      isUserDataFetching: false
    }, {
      type: ActionType.SET_USER_IS_FETCHING,
      payload: true
    })).toEqual({
      userData: {},
      isUserDataFetching: true
    });
  });

  it(`Reducer should change is need logout state`, () => {
    expect(reducer({
      needLogout: false,
      userData: {},
      isUserDataFetching: false
    }, {
      type: ActionType.NEED_LOGOUT,
      payload: true
    })).toEqual({
      needLogout: true,
      userData: null,
      isUserDataFetching: false
    });
  });
});

describe(`Action Creators work correctly`, () => {
  it(`Action Creator for receiving user data returns correct action`, () => {
    expect(ActionCreator.authorizeUser({fake: true})).toEqual({
      type: ActionType.AUTHORIZE_USER,
      payload: {fake: true}
    });
  });
});

