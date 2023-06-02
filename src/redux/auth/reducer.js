import authActions from "./action";
import { readLocalStorage } from "../../helpers/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth.constant";

const _getSessionKey = () => {
  const sessionKey = readLocalStorage(ACCESS_TOKEN);
  return sessionKey ? sessionKey : null;
};

const _getRefreshKey = () => {
  const refreshKey = readLocalStorage(REFRESH_TOKEN);
  return refreshKey ? refreshKey : null;
};

const defaultUser = {};

const initialState = {
  sessionKey: _getSessionKey(),
  isLoggedIn: _getSessionKey() != null,
  refreshKey: _getRefreshKey(),
  isLoading: false,
  error: null,
  userInfo: defaultUser,
  regUser: defaultUser,
  permissions: [],
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case authActions.types.LOGIN:
      return {
        ...state,
        ...{
          isLoading: true,
        },
      };
    case authActions.types.LOGOUT:
      return {
        ...state,
        ...{
          isLoading: true,
        },
      };
    // case authActions.types.CHANGE_PASSWORD:
    //   return state;
    case authActions.types.TEST_TOKEN:
      return {
        ...state,
        ...{
          isLoading: true,
          userInfo: { ...state.userInfo },
        },
      };

    case authActions.types.CREATE_USER:
      return {
        ...state,
        ...{
          isLoading: true,
          regUser: { ...state.regUser },
        },
      };
    // case authActions.types.GET_USER_INFO:
    //   return state;
    case authActions.types.UPDATE_STATE:
      return {
        ...state,
        ...payload.state,
      };
    default:
      return state;
  }
};

export default reducer;
