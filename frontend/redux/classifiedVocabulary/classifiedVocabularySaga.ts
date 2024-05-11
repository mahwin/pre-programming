import { classifiedVocabularyActions } from "./classifiedVocabularySlice";
import { getClassifiedVocabulary } from "./classifiedVocabularyAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getCategories() {
  try {
    const response: AxiosResponse = yield call(getClassifiedVocabulary);
    yield put(
      classifiedVocabularyActions.getClassifiedVocabularySuccess(response)
    );
  } catch (error) {
    yield put(classifiedVocabularyActions.getClassifiedVocabularyError(error));
  }
}

function* watchGetCategories() {
  yield takeLatest(
    classifiedVocabularyActions.getClassifiedVocabulary,
    getCategories
  );
}

export default function* getCategoriesSaga() {
  yield all([fork(watchGetCategories)]);
}
