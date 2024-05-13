import { userVocabularyActions } from "./userVocabularySlice";
import * as Api from "./userVocabularyApi";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { CategoriesType } from "@type/commons/categories";

interface Response {
  data: { [category in CategoriesType]: string };
}
function* getUserVocabulary() {
  try {
    const { data }: Response = yield call(Api.getUserVocabulary);
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
