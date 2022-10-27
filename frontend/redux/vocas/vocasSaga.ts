import { vocasActions } from "./vocasSlice";
import * as vocasAPI from "./vocasAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getVocas() {
  try {
    const response: AxiosResponse = yield call(vocasAPI.getVocas);
    yield put(vocasActions.getVocasSuccess(response.data));
  } catch (error) {
    yield put(vocasActions.getVocasError(error));
  }
}

function* watchGetUser() {
  yield takeLatest(vocasActions.getVocas, getVocas);
}

export default function* getUserSaga() {
  yield all([fork(watchGetUser)]);
}
