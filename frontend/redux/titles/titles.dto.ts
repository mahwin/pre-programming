import { ITitlesState } from "@type/commons/title";

const initialTitlesState: ITitlesState = {
  loading: false,
  data: null,
  error: null,
};

export { initialTitlesState, type ITitlesState };
