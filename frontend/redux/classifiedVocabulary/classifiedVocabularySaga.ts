import { classifiedVocabularyActions } from "./classifiedVocabularySlice";
import * as Api from "./classifiedVocabularyAPI";
import { takeLeading, call, put } from "redux-saga/effects";
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

export default function* rootSaga() {
  yield takeLeading(
    classifiedVocabularyActions.getClassifiedVocabulary.type,
    getClassifiedVocabulary
  );
}
