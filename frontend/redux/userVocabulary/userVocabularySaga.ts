import { userVocabularyActions } from "./userVocabularySlice";
import * as Api from "./userVocabularyApi";
import { takeLeading, call, put } from "redux-saga/effects";
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

export default function* rootSaga() {
  yield takeLeading(
    userVocabularyActions.getUserVocabulary.type,
    getUserVocabulary
  );
}
