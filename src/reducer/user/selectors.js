import NameSpace from "../name-spaces";


const NAME_SPACE = NameSpace.USER;

const receiveUserDataSelector = (state) => {
  return state[NAME_SPACE].userData;
};

const getIsUserDataFetchingSelector = (state) => {
  return state[NAME_SPACE].isUserDataFetching;
};

const getNeedLogoutSelector = (state) => {
  return state[NAME_SPACE].needLogout;
};


export {
  receiveUserDataSelector,
  getIsUserDataFetchingSelector,
  getNeedLogoutSelector
};
