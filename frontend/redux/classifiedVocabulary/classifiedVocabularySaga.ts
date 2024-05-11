import { classifiedVocabularyActions } from "./classifiedVocabularySlice";
import * as Api from "./classifiedVocabularyAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getClassifiedVocabulary() {
  try {
    const response: AxiosResponse = yield call(Api.getClassifiedVocabulary);
    yield put(
      classifiedVocabularyActions.getClassifiedVocabularySuccess(response)
    );
  } catch (error) {
    yield put(classifiedVocabularyActions.getClassifiedVocabularyError(error));
  }
}

function* watchGetclassifiedVocabulary() {
  yield takeLatest(
    classifiedVocabularyActions.getClassifiedVocabulary,
    getClassifiedVocabulary
  );
}

export default function* getClassifiedVocabularySaga() {
  yield all([fork(watchGetclassifiedVocabulary)]);
}
