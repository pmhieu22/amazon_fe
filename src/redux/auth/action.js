const prefix = "AUTH_";

const types = {
  LOGIN: prefix + "LOGIN",
  LOGOUT: prefix + "LOGOUT",
  CREATE_USER: prefix + "CREATE_USER",
  TEST_TOKEN: prefix + "TEST_TOKEN",
  UPDATE_STATE: prefix + "UPDATE_STATE",
};

const actions = {
  login: (username = "", password = "") => {
    return {
      type: types.LOGIN,
      payload: {
        username,
        password,
      },
    };
  },
  logout: () => {
    return {
      type: types.LOGOUT,
      payload: {},
    };
  },
  changePassword: (newPassword = "") => {
    return {
      type: types.CHANGE_PASSWORD,
      payload: {
        newPassword,
      },
    };
  },
  createUser: (email, username, password) => {
    return {
      type: types.CREATE_USER,
      payload: {
        email,
        username,
        password,
      },
    };
  },
  testToken: (token) => {
    return {
      type: types.TEST_TOKEN,
      payload: {
        token,
      },
    };
  },

  getUserInfo: () => {
    return {
      type: types.GET_USER_INFO,
      payload: {},
    };
  },

  resetPasswordUser: (id) => {
    return {
      type: types.RESET_PASSWORD_USER,
      payload: { id },
    };
  },

  updateState: (state = {}) => {
    return {
      type: types.UPDATE_STATE,
      payload: {
        state,
      },
    };
  },
};

const authActions = { actions, types };

export default authActions;
