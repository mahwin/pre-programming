import { throttle, call, put, takeLeading } from "redux-saga/effects";
import { categoriesActions } from "./categoriesSlice";
import * as Api from "./categoriesAPI";
import { AxiosResponse } from "axios";

function* getCategories() {
  try {
    const response: AxiosResponse = yield call(Api.getCategories);
    yield put(categoriesActions.getCategoriesSuccess(response));
  } catch (error) {
    yield put(categoriesActions.getCategoriesError(error));
  }
}

export default function* rootSaga() {
  yield takeLeading(categoriesActions.getCategories.type, getCategories);
}
