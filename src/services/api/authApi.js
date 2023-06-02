import { request } from "../baseRequest";

const authApi = {
  testToken: () => {
    return request({
      url: "/api/v1/auth/test-token",
      method: "POST",
      isAuthRequest: true,
    });
  },

  login: (username, password) => {
    const frmData = new FormData();
    frmData.append("username", username);
    frmData.append("password", password);
    return request({
      url: "/api/v1/auth/login",
      method: "POST",
      data: frmData,
      isAuthRequest: false,
    });
  },

  createUser: (email, username, password) => {
    return request({
      url: "/api/v1/users/create",
      method: "POST",
      data: {
        email: email,
        username: username,
        password: password,
      },
      isAuthRequest: false,
    });
  },

  getUserInfo: () => {
    return request({
      url: "/home/v1/users",
      method: "GET",
      isAuthRequest: true,
    });
  },

  changePassword: (password, newPassword, confirmPassword) => {
    return request({
      url: "/auth/v1/change_password",
      method: "PUT",
      isAuthRequest: true,
      data: {
        confirm_password: confirmPassword,
        new_password: newPassword,
        password: password,
      },
    });
  },

  updateProfile: (fullname, address, sex, phone) => {
    return request({
      url: "/home/v1/users",
      method: "PUT",
      isAuthRequest: true,
      data: {
        fullname,
        address,
        sex,
        phone,
      },
    });
  },

  forgotPassword: (email) => {
    return request({
      url: "/auth/v1/forget_password",
      method: "POST",
      isAuthRequest: false,
      data: {
        email,
      },
    });
  },

  resetPassword: (newPassword, confirmPassword, token_verify) => {
    return request({
      url: "/auth/v1/reset_password",
      method: "PUT",
      isAuthRequest: false,
      data: {
        new_password: newPassword,
        confirm_password: confirmPassword,
        token_verify: token_verify,
      },
    });
  },

  resetPasswordUser: (id) => {
    return request({
      url: `admin/v1/users/reset_password/${id}`,
      method: "PUT",
      isAuthRequest: true,
    });
  },
};

export default authApi;
