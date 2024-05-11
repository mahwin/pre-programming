import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import getUserSaga from "./user/userSaga";
import getVocasSaga from "./vocabulary/vocabularySaga";
import getUserVocasSaga from "./userVocabulary/userVocasSaga";
import getCategoriesSaga from "./categories/categoriesSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    getUserVocasSaga(),
    getVocasSaga(),
    getUserSaga(),
    getCategoriesSaga(),
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
