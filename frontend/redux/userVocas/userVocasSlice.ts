import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";

const userVocasSlice = createSlice({
  name: "userVocas",
  initialState: initialState.userVocas,
  reducers: {
    getUserVocas: (state) => {
      state.loading = true;
    },
    getUserVocasSuccess: (state, { payload }) => {
      console.log(payload.data);
      state.loading = false;
      state.data = payload.data;
    },
    getUserVocasError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export
export const userVocasActions = userVocasSlice.actions;
export default userVocasSlice.reducer;
