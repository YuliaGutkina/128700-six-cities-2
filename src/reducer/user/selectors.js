// import {createSelector} from "reselect";
import NameSpace from "../name-spaces";


const NAME_SPACE = NameSpace.USER;

const getAuthorizationStatusSelector = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};


export {
  getAuthorizationStatusSelector
};
