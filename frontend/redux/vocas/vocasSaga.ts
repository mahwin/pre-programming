import { vocasActions } from "./vocasSlice";
import * as vocasAPI from "./vocasAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getVoca() {
  try {
    const response: AxiosResponse = yield call(vocasAPI.getVoca);

    yield put(vocasActions.getVocaSuccess(response.data));
  } catch (error) {
    yield put(vocasActions.getVocaError(error));
  }
}

function* watchGetVoca() {
  yield takeLatest(vocasActions.getVoca, getVoca);
}
export default function* getVocasSaga() {
  yield all([fork(watchGetVoca)]);
}
