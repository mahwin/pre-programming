import { titlesActions } from "./titlesSlice";
import * as titlesAPI from "./titlesAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getTitles() {
  try {
    const response: AxiosResponse = yield call(titlesAPI.getTitles);
    yield put(titlesActions.getTitlesSuccess(response));
  } catch (error) {
    yield put(titlesActions.getTitlesError(error));
  }
}

function* watchGetTitles() {
  yield takeLatest(titlesActions.getTitles, getTitles);
}

export default function* getTitlesSaga() {
  yield all([fork(watchGetTitles)]);
}
