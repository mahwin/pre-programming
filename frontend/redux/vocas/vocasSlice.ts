import initialState from "../initialState";
import { createSlice } from "@reduxjs/toolkit";
import { VocasType } from "./vocas.dto";

const vocasSlice = createSlice({
  name: "voca",
  initialState: initialState.vocas,
  reducers: {
    getVoca: (state, { payload: { data, category } }) => {
      state.data = data;
      state.category = category;
    },
  },
});

// 정의한 액션과 리듀서를 export
export const vocasActions = vocasSlice.actions;
export default vocasSlice.reducer;
