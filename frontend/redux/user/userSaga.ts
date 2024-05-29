import { userActions } from "./userSlice";
import * as userAPI from "./userAPI";
import { takeLeading, call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

function* getUser() {
  try {
    const response: AxiosResponse = yield call(userAPI.getUser);
    yield put(userActions.getUserSuccess(response));
  } catch (error) {
    yield put(userActions.getUserError(error));
  }
}

export default function* rootSaga() {
  yield takeLeading(userActions.getUser.type, getUser);
}
