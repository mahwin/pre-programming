import { userVocasActions } from "./userVocasSlice";
import * as userVocasApi from "./userVocasApi";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getUserVocas() {
  try {
    const response: AxiosResponse = yield call(userVocasApi.getUserVocas);
    yield put(userVocasActions.getUserVocasSuccess(response.data));
  } catch (error) {
    yield put(userVocasActions.getUserVocasError(error));
  }
}

function* watchGetUserVocas() {
  yield takeLatest(userVocasActions.getUserVocas, getUserVocas);
}

export default function* getUserVocasSaga() {
  yield all([fork(watchGetUserVocas)]);
}
