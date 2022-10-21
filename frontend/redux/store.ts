import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { call, all } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import getUserSaga from "./user/userSaga";
import getVocasSaga from "./vocas/vocasSaga";
import { createWrapper } from "next-redux-wrapper";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([call([getVocasSaga, getUserSaga])]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type AppStore = ReturnType<typeof createStore>;

const wrapper = createWrapper<AppStore>(createStore);
export default wrapper;
