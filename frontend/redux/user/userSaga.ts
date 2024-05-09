import { userActions } from "./userSlice";
import * as userAPI from "./userAPI";
import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getUser() {
  try {
    const response: AxiosResponse = yield call(userAPI.getUser);
    yield put(userActions.getUserSuccess(response));
  } catch (error) {
    yield put(userActions.getUserError(error));
  }
}

function* watchGetUser() {
  yield takeLatest(userActions.getUser, getUser);
}

export default function* getUserSaga() {
  yield all([fork(watchGetUser)]);
}
