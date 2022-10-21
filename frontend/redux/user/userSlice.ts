import initialState from "../initialState";
import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: initialState.user,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    getUserError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    updateUser: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    updateUserError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export.
export const userActions = userSlice.actions;
export default userSlice.reducer;
