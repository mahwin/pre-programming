import { AxiosError } from "axios";

const CATEGORIES = [
  "next",
  "react",
  "reactHookForm",
  "reactQuery",
  "reactRedux",
  "reactRouter",
  "recoil",
  "styledComponents",
  "tailwindcss",
  "axios",
] as const;

type DevType = "web";
type CategoriesType = (typeof CATEGORIES)[number];

type TitleItem = {
  title: string;
  ok: boolean;
  amount: string;
  install: string;
};

type TitleItems = TitleItem[];

type TitleInfo = Record<string, TitleItem[]>;

type ITitles = Record<"web", TitleItem[]>;

interface ITitlesState {
  loading: boolean;
  data: ITitles | null;
  error: AxiosError | null;
}

export type {
  TitleItems,
  TitleItem,
  DevType,
  TitlesType,
  TitleInfo,
  ITitles,
  ITitlesState,
};
export { TITLES };
