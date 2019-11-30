// import {createSelector} from "reselect";
import NameSpace from "../name-spaces";


const NAME_SPACE = NameSpace.USER;

const receiveUserDataSelector = (state) => {
  return state[NAME_SPACE].userData;
};


export {
  receiveUserDataSelector
};
