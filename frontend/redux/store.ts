import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import getUserSaga from "./user/userSaga";
import getVocasSaga from "./vocas/vocasSaga";
import getUserVocasSaga from "./userVocas/userVocasSaga";
import getTitlesSage from "./titles/titlesSage";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    getUserVocasSaga(),
    getVocasSaga(),
    getUserSaga(),
    getTitlesSage(),
  ]);
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
