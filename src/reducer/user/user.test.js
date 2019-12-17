import {ActionCreator, ActionType, reducer} from "./user";


describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      userData: null
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
});

describe(`Action Creators work correctly`, () => {
  it(`Action Creator for receiving user data returns correct action`, () => {
    expect(ActionCreator.authorizeUser({fake: true})).toEqual({
      type: ActionType.AUTHORIZE_USER,
      payload: {fake: true}
    });
  });
});

describe(`Operations work correctly`, () => {
  it(``, () => {
    // expect(reducer(undefined, {})).toEqual({
    //   userData: null
    // });
  });
});
