import {ActionCreator, ActionType, reducer} from "./user";


describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: false
    });
  });

  it(`Reducer should change require autorization flag to given value`, () => {
    expect(reducer({
      isAuthorizationRequired: false
    }, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    })).toEqual({
      isAuthorizationRequired: true
    });
  });
});

describe(`Action Creators work correctly`, () => {
  it(`Action Creator for changing city returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    });
  });
});
