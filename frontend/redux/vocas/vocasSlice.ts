import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";
import { VocasType } from "./vocas.dto";

const vocasSlice = createSlice({
  name: "vocas",
  initialState: initialState.vocas,
  reducers: {
    getVocas: (state) => {
      state.loading = true;
    },
    getVocasSuccess: (state, { payload }) => {
      state.loading = false;
      state.data = JSON.parse(payload.data);
    },
    getVocasError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export
export const vocasActions = vocasSlice.actions;
export default vocasSlice.reducer;
