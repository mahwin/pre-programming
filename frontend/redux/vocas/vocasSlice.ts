import IVocas from "./vocas.dto";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface VocasState {
  loading: boolean;
  data: IVocas | null;
  error: AxiosError | null;
}

const initialState: VocasState = {
  loading: false,
  data: null,
  error: null,
};

const vocasSlice = createSlice({
  name: "vocas",
  initialState,
  reducers: {
    getVocas: (state) => {
      state.loading = true;
    },
    getVocasSuccess: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
    getVocasError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// 정의한 액션과 리듀서를 export한다.
export const vocasActions = vocasSlice.actions;
export default vocasSlice.reducer;
