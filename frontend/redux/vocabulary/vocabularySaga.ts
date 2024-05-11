import { vocabularyAction } from "./vocabularySlice";
import * as Api from "./vocabularyAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getVocabulary() {
  try {
    const { data }: AxiosResponse = yield call(Api.getVocabulary);
    yield put(vocabularyAction.getVocabularySuccess(data));
  } catch (error) {
    yield put(vocabularyAction.getVocabularyError(error));
  }
}

function* watchGetVocas() {
  yield takeLatest(vocabularyAction.getVocabulary, getVocabulary);
}

export default function* getVocasSaga() {
  yield all([fork(watchGetVocas)]);
}
