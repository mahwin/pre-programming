import { vocabularyAction } from "./vocabularySlice";
import * as Api from "./vocabularyAPI";
import { takeLeading, call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getVocabulary() {
  try {
    const { data }: AxiosResponse = yield call(Api.getVocabulary);
    yield put(vocabularyAction.getVocabularySuccess(data));
  } catch (error) {
    yield put(vocabularyAction.getVocabularyError(error));
  }
}

export default function* rootSaga() {
  yield takeLeading(vocabularyAction.getVocabulary.type, getVocabulary);
}
