import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ...rootReducer,
  },
  devTools: true,
  middleware: (defaultMiddleWare) => defaultMiddleWare().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };
