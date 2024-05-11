import { vocasActions } from "./vocabularySlice";
import { getVocabulary } from "./vocabularyAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getVocas() {
  try {
    const response: AxiosResponse = yield call(getVocabulary);
    yield put(vocasActions.getVocabularySuccess(response.data));
  } catch (error) {
    yield put(vocasActions.getVocabularyError(error));
  }
}

function* watchGetVocas() {
  yield takeLatest(vocasActions.getVocabulary, getVocas);
}

export default function* getVocasSaga() {
  yield all([fork(watchGetVocas)]);
}
