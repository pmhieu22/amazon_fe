import { fork, all, takeEvery, put, takeLatest } from "redux-saga/effects";
import authActions from "./action";

import {
  clearLocalStorage,
  writeLocalStorage,
} from "../../helpers/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/auth.constant";
import { log } from "../../helpers/log";
import { showNotification } from "../../hooks/showNotification";
import authApi from "../../services/api/authApi";

function* testToken_saga(action) {
  try {
    const payload = action.payload;
    console.log("payload", payload);
    const res = yield authApi.testToken(payload.token);

    console.log("test token", res);
    // if (res.statusCode !== 200) {
    //     yield put(authActions.actions.updateState({
    //         isLoading: false,
    //         isLoggedIn: false,
    //         sessionKey: null
    //     }));
    // }
  } catch (error) {
    // yield put(
    //   authActions.actions.updateState({
    //     isLoading: false,
    //     isLoggedIn: false,
    //     sessionKey: null,
    //   })
    // );
    // log("[AUTH SAGA][checkSession_saga]", error);
  }
}

function* login_saga(action) {
  try {
    // console.log("gdfgdf");
    const { username, password } = action.payload;

    const res = yield authApi.login(username, password);
    if (res.access_token) {
      const sessionKey = res.access_token;
      const refreshKey = res.refresh_token;

      writeLocalStorage(ACCESS_TOKEN, sessionKey);
      writeLocalStorage(REFRESH_TOKEN, refreshKey);
      yield put(
        authActions.actions.updateState({
          sessionKey: sessionKey,
          refreshKey: refreshKey,
          isLoggedIn: true,
          isLoading: false,
          error: null,
        })
      );

      showNotification("success", "Login Successful!", "", 1.5);
    }
  } catch (error) {
    console.log("err: ", error);
    yield put(
      authActions.actions.updateState({
        isLoading: false,
        isLoggedIn: false,
        sessionKey: null,
        refreshKey: null,
        error: "login failed",
      })
    );

    showNotification(
      "error",
      "Login Failed!",
      "Please check your username and password",
      1.5
    );

    // toast({
    //   position: "top",
    //   title: "Đăng nhập không thành công",
    //   description: error.data.message,
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    // });

    // log("[AUTH SAGA][login_saga]", error);
  }
}

// function* getUserInfo_saga() {
//     try {
//         const res = yield authAPI.getUserInfo();
//         const { user, permissions } = res.result;

//         if (user) {
//             yield put(authActions.actions.updateState({
//                 isLoading: false,
//                 isLoggedIn: true,
//                 userInfo: user,
//                 permissions,
//                 error: null
//             }))
//         }
//         else {
//             yield put(authActions.actions.updateState({
//                 isLoading: false,
//                 isLoggedIn: false,
//                 sessionKey: null,
//                 userInfo: null,
//                 permissions: []
//             }));

//             clearLocalStorage(ACCESS_TOKEN);
//         }
//     }
//     catch (error) {
//         yield put(authActions.actions.updateState({
//             isLoading: false,
//             isLoggedIn: false,
//             sessionKey: null,
//             error: 'Get user info failed'
//         }));

//         log('[AUTH SAGA][getUserInfo_saga]', error);
//     }
// }

function* logout_saga(action) {
  try {
    clearLocalStorage(ACCESS_TOKEN);
    clearLocalStorage(REFRESH_TOKEN);

    yield put(
      authActions.actions.updateState({
        isLoading: false,
        isLoggedIn: false,
        sessionKey: null,
        refreshKey: null,
        error: null,
      })
    );

    showNotification("success", "Logout Successful", "", 1.5);
  } catch (error) {
    log("[AUTH SAGA][logout_saga]", error);
  }
}

// function* resetPasswordUser_saga(action) {
//     try {
//         const { id } = action.payload;
//         const res = yield authAPI.resetPasswordUser(id);
//         console.log(res);
//         toast({
//             position: 'top',
//             title: "reset mật khẩu thành công",
//             status: "success",
//             duration: 5000,
//             isClosable: true,
//         });
//     }
//     catch (error) {
//         toast({
//             position: 'top',
//             title: "reset mật khẩu không thành công",
//             description: error.data.message,
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//         });
//         log('[AUTH SAGA][resetPasswordUser_saga]')
//     }
// }

function* listen() {
  yield takeEvery(authActions.types.TEST_TOKEN, testToken_saga);
  yield takeLatest(authActions.types.LOGIN, login_saga);
  // yield takeEvery(authActions.types.GET_USER_INFO, getUserInfo_saga);
  yield takeEvery(authActions.types.LOGOUT, logout_saga);
  // yield takeEvery(authActions.types.RESET_PASSWORD_USER, resetPasswordUser_saga);
}

export default function* authSaga() {
  yield all([fork(listen)]);
}
