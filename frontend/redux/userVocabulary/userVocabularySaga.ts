import { userVocabularyActions } from "./userVocabularySlice";
import * as Api from "./userVocabularyApi";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getUserVocabulary() {
  try {
    const { data }: AxiosResponse = yield call(Api.getUserVocabulary);
    yield put(userVocabularyActions.getUserVocabularySuccess(data));
  } catch (error) {
    yield put(userVocabularyActions.getUserVocabularyError(error));
  }
}

function* watchGetUserVocas() {
  yield takeLatest(userVocabularyActions.getUserVocabulary, getUserVocabulary);
}

export default function* getUserVocasSaga() {
  yield all([fork(watchGetUserVocas)]);
}
