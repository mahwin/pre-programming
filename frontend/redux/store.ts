import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import getUserSaga from "./user/userSaga";
import getVocasSaga from "./vocabulary/vocabularySaga";
import getUserVocabularySaga from "./userVocabulary/userVocabularySaga";
import getCategoriesSaga from "./categories/categoriesSaga";
import getClassifiedVocabularySaga from "./classifiedVocabulary/classifiedVocabularySaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    getUserVocabularySaga(),
    getVocasSaga(),
    getUserSaga(),
    getCategoriesSaga(),
    getClassifiedVocabularySaga(),
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
