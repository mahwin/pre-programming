import UserState from "./user.dto";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      console.log("성공");
      state.data = payload;
      state.loading = false;
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

// 정의한 액션과 리듀서를 export한다.
export const userActions = userSlice.actions;
export default userSlice.reducer;
