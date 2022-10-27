import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { call, all } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import getUserSaga from "./user/userSaga";
import vocasGetSaga from "./vocas/vocasSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([getUserSaga(), vocasGetSaga()]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = createStore();

export default store;
