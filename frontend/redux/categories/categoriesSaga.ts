import { categoriesActions } from "./categoriesSlice";
import * as Api from "./categoriesAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getCategories() {
  try {
    const response: AxiosResponse = yield call(Api.getCategories);
    yield put(categoriesActions.getCategoriesSuccess(response));
  } catch (error) {
    yield put(categoriesActions.getCategoriesError(error));
  }
}

function* watchGetCategories() {
  yield takeLatest(categoriesActions.getCategories, getCategories);
}

export default function* getCategoriesSaga() {
  yield all([fork(watchGetCategories)]);
}
