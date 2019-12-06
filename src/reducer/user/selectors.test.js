import NameSpace from "../name-spaces";
import {receiveUserDataSelector} from "./selectors";


const NAME_SPACE = NameSpace.USER;

describe(`Selectors work correctly`, () => {
  it(`Selector for receiving user data returns correct value`, () => {
    expect(receiveUserDataSelector({
      [NAME_SPACE]: {
        userData: {
          fake: true
        }
      }
    })).toEqual({
      fake: true
    });
  });
});
